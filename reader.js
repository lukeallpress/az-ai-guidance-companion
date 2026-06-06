/* AZ GenAI Guidance — password gate + role-aware encrypted page reader.
   Pages are pre-rendered images, AES-256-GCM encrypted (assets/pages/pNN.enc),
   decrypted in the browser with the access word. No pdf.js / no worker:
   fast and reliable on mobile. Soft gate for a working draft, not hard security. */
(function () {
  "use strict";
  var D = window.AZ_DATA;
  var SS_PW = "az_pw_v1", SS_UNLOCK = "az_unlocked_v1";
  var SALT_URL = "assets/pages/salt.bin", VERIFY_URL = "assets/verifier.enc";
  var ITER = 200000, NPAGES = (D.meta && D.meta.pages) || 41;

  var cryptoKey = null, saltBytes = null, builtRole = null;

  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function norm(pw) { return String(pw || "").trim().toLowerCase(); }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function storedPw() { try { return sessionStorage.getItem(SS_PW) || ""; } catch (_) { return ""; } }

  /* ---------- crypto ---------- */
  async function getKey(pw) {
    if (cryptoKey) return cryptoKey;
    if (!saltBytes) saltBytes = new Uint8Array(await (await fetch(SALT_URL, { cache: "force-cache" })).arrayBuffer());
    var base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]);
    cryptoKey = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: saltBytes, iterations: ITER, hash: "SHA-256" },
      base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    return cryptoKey;
  }
  async function decryptBytes(url) {
    var buf = new Uint8Array(await (await fetch(url, { cache: "force-cache" })).arrayBuffer());
    var key = await getKey(storedPw());
    return new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv: buf.slice(0, 12) }, key, buf.slice(12)));
  }
  async function verify(pw) {
    cryptoKey = null; saltBytes = null;
    try {
      var key = await getKey(pw);
      var buf = new Uint8Array(await (await fetch(VERIFY_URL, { cache: "force-cache" })).arrayBuffer());
      var out = new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: buf.slice(0, 12) }, key, buf.slice(12)));
      if (out === "AZ-GUIDANCE-OK") return true;
    } catch (_) {}
    cryptoKey = null; return false;
  }

  /* ---------- gate ---------- */
  function unlock() {
    document.body.classList.add("unlocked");
    document.documentElement.classList.add("unlocked");
    var g = $("#gate"); if (g) g.setAttribute("hidden", "");
    try { sessionStorage.setItem(SS_UNLOCK, "1"); } catch (_) {}
  }
  function wireGate() {
    var form = $("#gate-form"); if (!form) return;
    try { if (sessionStorage.getItem(SS_UNLOCK) === "1") unlock(); } catch (_) {}
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var pw = norm($("#gate-pw").value), err = $("#gate-err"), btn = form.querySelector("button");
      err.setAttribute("hidden", ""); btn.disabled = true; btn.textContent = "Checking…";
      verify(pw).then(function (ok) {
        btn.disabled = false; btn.textContent = "Enter";
        if (ok) { try { sessionStorage.setItem(SS_PW, pw); } catch (_) {} unlock(); window.AZtrack && window.AZtrack("unlock"); }
        else { err.removeAttribute("hidden"); $("#gate-pw").select(); }
      });
    });
  }

  /* ---------- page set per role ---------- */
  function parsePages(str) {
    var out = [];
    String(str).split(",").forEach(function (part) {
      part = part.trim().replace(/[–—]/g, "-");
      var m = part.match(/(\d+)\s*-\s*(\d+)/);
      if (m) { for (var i = +m[1]; i <= +m[2]; i++) out.push(i); }
      else { var n = part.match(/\d+/); if (n) out.push(+n[0]); }
    });
    return out;
  }
  function roleById(id) { return D.roles.filter(function (r) { return r.id === id; })[0] || D.roles[0]; }
  function recSet(role) {
    var s = {};
    role.readFirst.concat(role.readNext).forEach(function (it) {
      parsePages(it.pages).forEach(function (p) { s[p] = true; });
    });
    return s;
  }

  /* ---------- page images ---------- */
  function pageHolder(p) {
    var d = document.createElement("div");
    d.className = "reader-page"; d.setAttribute("data-page", p);
    d.innerHTML = '<div class="reader-skeleton">Page ' + p + "…</div>";
    return d;
  }
  function loadPage(el) {
    if (el.getAttribute("data-loaded")) return;
    el.setAttribute("data-loaded", "1");
    var p = +el.getAttribute("data-page");
    decryptBytes("assets/pages/p" + pad2(p) + ".enc").then(function (bytes) {
      var url = URL.createObjectURL(new Blob([bytes], { type: "image/jpeg" }));
      var img = new Image();
      img.alt = "Page " + p + " of the guidance";
      img.decoding = "async";
      img.src = url;
      el.innerHTML = "";
      el.appendChild(img);
      var num = document.createElement("div"); num.className = "reader-pagenum"; num.textContent = "Page " + p;
      el.appendChild(num);
    }).catch(function () {
      el.removeAttribute("data-loaded");
      el.innerHTML = '<div class="reader-skeleton">Page ' + p + " — couldn’t load. Reload and re-enter the access word.</div>";
    });
  }
  function loadHolders(scope) { $all(".reader-page", scope).forEach(loadPage); }

  function revealRun(run) {
    if (run.getAttribute("data-open") === "1") return;
    run.setAttribute("data-open", "1");
    var a = +run.getAttribute("data-from"), b = +run.getAttribute("data-to");
    var target = run.querySelector(".reveal-target");
    for (var p = a; p <= b; p++) target.appendChild(pageHolder(p));
    target.removeAttribute("hidden");
    run.querySelector(".reveal-label").textContent = "Hide page" + (b > a ? "s " + a + "–" + b : " " + a);
    loadHolders(target);
  }
  function collapsedRun(a, b, role) {
    var d = document.createElement("div");
    d.className = "reader-collapsed"; d.setAttribute("data-from", a); d.setAttribute("data-to", b);
    d.innerHTML =
      '<button type="button" class="reveal-btn">' +
        '<span class="reveal-chev" aria-hidden="true">▸</span> ' +
        '<span class="reveal-label">Show page' + (b > a ? "s " + a + "–" + b : " " + a) + "</span>" +
        '<small>not on the ' + role.short + " route</small>" +
      "</button><div class=\"reveal-target\" hidden></div>";
    d.querySelector(".reveal-btn").addEventListener("click", function () {
      if (d.getAttribute("data-open") === "1") {
        d.removeAttribute("data-open");
        var t = d.querySelector(".reveal-target"); t.setAttribute("hidden", ""); t.innerHTML = "";
        d.querySelector(".reveal-label").textContent = "Show page" + (b > a ? "s " + a + "–" + b : " " + a);
      } else { revealRun(d); }
    });
    return d;
  }
  function buildLayout(role) {
    var box = $("#reader-pages"); if (!box) return;
    box.innerHTML = ""; builtRole = role.id;
    var rec = recSet(role), i = 1;
    while (i <= NPAGES) {
      var isRec = !!rec[i], j = i;
      while (j + 1 <= NPAGES && (!!rec[j + 1]) === isRec) j++;
      if (isRec) {
        var h = document.createElement("div");
        h.className = "rec-head";
        h.innerHTML = '<span class="rec-dot"></span> Recommended for <b>' + role.short +
          "</b> · page" + (j > i ? "s " + i + "–" + j : " " + i);
        box.appendChild(h);
        for (var p = i; p <= j; p++) box.appendChild(pageHolder(p));
      } else {
        box.appendChild(collapsedRun(i, j, role));
      }
      i = j + 1;
    }
    loadHolders(box); // eager-load the recommended pages (few; rest load on expand)
  }

  function jumpTo(p) {
    var el = $all(".reader-page").filter(function (e) { return e.getAttribute("data-page") === String(p); })[0];
    if (!el) {
      var run = $all(".reader-collapsed").filter(function (r) {
        return p >= +r.getAttribute("data-from") && p <= +r.getAttribute("data-to");
      })[0];
      if (run) { revealRun(run); el = $all(".reader-page").filter(function (e) { return e.getAttribute("data-page") === String(p); })[0]; }
    }
    if (el) { loadPage(el); setTimeout(function () { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60); }
  }

  /* ---------- entry ---------- */
  function showReaderTab() { var t = $("#tab-read"); if (t) t.click(); }
  function currentRoleId() { return window.AZ_activeRole || (D.roles[0] && D.roles[0].id); }
  function ensureReader(jumpPage, roleId) {
    if (!document.body.classList.contains("unlocked")) return;
    roleId = roleId || currentRoleId();
    var sel = $("#reader-role"); if (sel && sel.value !== roleId) sel.value = roleId;
    if (builtRole !== roleId) buildLayout(roleById(roleId));
    if (jumpPage) jumpTo(jumpPage);
  }
  window.openReader = function (page) { showReaderTab(); ensureReader(page); };

  function initReaderControls() {
    var sel = $("#reader-role"); if (!sel) return;
    sel.innerHTML = D.roles.map(function (r) { return '<option value="' + r.id + '">' + r.role + "</option>"; }).join("");
    sel.value = currentRoleId();
    sel.addEventListener("change", function () { ensureReader(null, sel.value); });
    var ex = $("#reader-expand");
    if (ex) ex.addEventListener("click", function () { $all(".reader-collapsed").forEach(revealRun); });
    $all('[data-tab="read"], [data-go="read"]').forEach(function (b) {
      b.addEventListener("click", function () { ensureReader(); });
    });
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".pagepill[data-page]");
      if (!b) return; e.preventDefault();
      var pg = +b.getAttribute("data-page");
      window.AZtrack && window.AZtrack("page", { page: pg });
      window.openReader(pg);
    });
  }

  wireGate();
  initReaderControls();
})();
