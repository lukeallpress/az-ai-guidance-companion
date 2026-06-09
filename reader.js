/* AZ GenAI Guidance — role-aware page reader.
   Pages are pre-rendered images (assets/pages/pNN.jpg). Each role's PRIORITY pages
   open first; the rest of the guidance is collapsed but one tap away — everything is
   worth reading. No pdf.js / no worker: fast and reliable on mobile. */
(function () {
  "use strict";
  var D = window.AZ_DATA;
  var NPAGES = (D.meta && D.meta.pages) || 41;
  var builtRole = null;

  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

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
    var img = new Image();
    img.alt = "Page " + p + " of the guidance";
    img.decoding = "async";
    img.onload = function () {};
    img.onerror = function () {
      el.removeAttribute("data-loaded");
      el.innerHTML = '<div class="reader-skeleton">Page ' + p + " — couldn’t load. Try reloading.</div>";
    };
    img.src = "assets/pages/p" + pad2(p) + ".jpg";
    el.innerHTML = "";
    el.appendChild(img);
    var num = document.createElement("div"); num.className = "reader-pagenum"; num.textContent = "Page " + p;
    el.appendChild(num);
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
  function collapsedRun(a, b) {
    var d = document.createElement("div");
    d.className = "reader-collapsed"; d.setAttribute("data-from", a); d.setAttribute("data-to", b);
    d.innerHTML =
      '<button type="button" class="reveal-btn">' +
        '<span class="reveal-chev" aria-hidden="true">▸</span> ' +
        '<span class="reveal-label">Show page' + (b > a ? "s " + a + "–" + b : " " + a) + "</span>" +
        "<small>the rest of the guidance — also worth reading</small>" +
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
        h.innerHTML = '<span class="rec-dot"></span> Priority for <b>' + role.short +
          "</b> · page" + (j > i ? "s " + i + "–" + j : " " + i);
        box.appendChild(h);
        for (var p = i; p <= j; p++) box.appendChild(pageHolder(p));
      } else {
        box.appendChild(collapsedRun(i, j));
      }
      i = j + 1;
    }
    loadHolders(box); // eager-load the priority pages (few; the rest load on expand)
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

  initReaderControls();
})();
