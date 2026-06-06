/* AZ GenAI Guidance Companion — view logic. Vanilla JS, no dependencies.
   All content comes from data.js (window.AZ_DATA). */
(function () {
  var D = window.AZ_DATA;
  var PDF = D.meta.pdfUrl;

  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pill(pages) {
    return '<a class="pagepill" href="' + PDF + '" target="_blank" rel="noopener" title="Open the guidance (p. ' + esc(pages) + ')">' + esc(pages) + '</a>';
  }

  // compact chrome automatically when embedded in an iframe (e.g. Google Sites)
  try { if (window.self !== window.top) document.body.classList.add('embed'); } catch (_) { document.body.classList.add('embed'); }

  // external links (optional in compact/embed layouts)
  var og = $('#open-guidance'); if (og) og.href = PDF;
  var fl = $('#foot-link'); if (fl) fl.href = PDF;

  // stats (optional)
  var statsEl = $('#stats');
  if (statsEl) statsEl.innerHTML = D.meta.stats.map(function (s) {
    return '<div class="stat"><b>' + esc(s.figure) + '</b><span>' + esc(s.label) + '</span></div>';
  }).join('');

  // start-here strip (optional)
  var startEl = $('#starthere');
  if (startEl) startEl.innerHTML = '<b>Everyone starts here:</b> ' +
    D.meta.startHere.map(function (s) { return esc(s.label) + ' ' + pill(s.pages); }).join(' <span aria-hidden="true">→</span> ');

  /* ---------------- READING ROUTES ---------------- */
  var rolemenu = $('#rolemenu'), roledetail = $('#roledetail');
  function renderRoleMenu(activeId) {
    rolemenu.innerHTML = D.roles.map(function (r) {
      return '<button class="rolebtn" data-role="' + r.id + '" aria-pressed="' + (r.id === activeId) + '">' +
        esc(r.role) + '<small>' + esc(r.time) + '</small></button>';
    }).join('');
  }
  function routeList(items) {
    return '<ul class="route-list">' + items.map(function (it) {
      return '<li><div class="rl-row"><span class="rl-label">' + esc(it.label) + '</span>' + pill(it.pages) + '</div></li>';
    }).join('') + '</ul>';
  }
  function renderRole(id) {
    var r = D.roles.filter(function (x) { return x.id === id; })[0] || D.roles[0];
    renderRoleMenu(r.id);
    roledetail.innerHTML =
      '<div class="role-banner"><div class="dots"></div>' +
        '<h3>' + esc(r.role) + '</h3><p>' + esc(r.audience) + '</p>' +
        '<div class="role-meta"><span class="chip">Time: <b>' + esc(r.time) + '</b></span>' +
          '<span class="chip">Focus: ' + esc(r.priority) + '</span></div>' +
      '</div>' +
      '<div class="role-body">' +
        '<div class="route-cols">' +
          '<div class="route-col route-col--first"><h4><span class="dot"></span>Read first</h4>' + routeList(r.readFirst) + '</div>' +
          '<div class="route-col route-col--next"><h4><span class="dot"></span>Read next, if you have time</h4>' + routeList(r.readNext) + '</div>' +
        '</div>' +
        '<div class="prompt"><b>Discussion prompt</b>' + esc(r.prompt) + '</div>' +
        '<div class="teaser"><h4>Ready-to-send teaser</h4><p>' + esc(r.teaser) + '</p>' +
          '<button class="copybtn" data-copy="teaser-' + r.id + '">Copy teaser</button>' +
          '<textarea id="teaser-' + r.id + '" class="hidden" aria-hidden="true">' + esc(r.teaser) + '</textarea></div>' +
      '</div>';
  }
  rolemenu.addEventListener('click', function (e) {
    var b = e.target.closest('[data-role]'); if (!b) return;
    var id = b.getAttribute('data-role');
    renderRole(id);
    try { history.replaceState(null, '', '#role=' + id); } catch (_) {}
  });

  /* ---------------- WHAT CHANGED ---------------- */
  var changeFilters = $('#changefilters'), changeGrid = $('#changegrid'), activeTag = 'all';
  function renderChangeFilters() {
    var tags = ['all'].concat(D.changeTags);
    changeFilters.innerHTML = tags.map(function (t) {
      return '<button class="fchip" data-tag="' + esc(t) + '" aria-pressed="' + (t === activeTag) + '">' + (t === 'all' ? 'All changes' : esc(t)) + '</button>';
    }).join('') + '<span class="count" id="changecount"></span>';
  }
  function renderChanges() {
    var list = D.changes.filter(function (c) { return activeTag === 'all' || c.tag === activeTag; });
    changeGrid.innerHTML = list.map(function (c) {
      return '<article class="change"><div class="change__side"><span class="badge badge--tag">' + esc(c.tag) + '</span>' + pill(c.pages) + '</div>' +
        '<div><h3>' + esc(c.title) + '</h3><p>' + esc(c.body) + '</p><p class="why"><b>Why it matters:</b> ' + esc(c.why) + '</p></div></article>';
    }).join('') || '<div class="empty">No changes match that filter.</div>';
    $('#changecount').textContent = list.length + ' of ' + D.changes.length;
  }
  changeFilters.addEventListener('click', function (e) {
    var b = e.target.closest('[data-tag]'); if (!b) return;
    activeTag = b.getAttribute('data-tag');
    $all('.fchip', changeFilters).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    renderChanges();
  });

  /* ---------------- EXPLORE SECTIONS ---------------- */
  var exploreList = $('#explorelist');
  function chapterOrder() {
    var seen = [];
    D.sections.forEach(function (s) { if (seen.indexOf(s.chapter) < 0) seen.push(s.chapter); });
    return seen;
  }
  function roleName(id) { var r = D.roles.filter(function (x) { return x.id === id; })[0]; return r ? r.short : id; }
  function renderExplore(q) {
    q = (q || '').trim().toLowerCase();
    var html = chapterOrder().map(function (ch) {
      var secs = D.sections.filter(function (s) {
        if (s.chapter !== ch) return false;
        if (!q) return true;
        return (s.title + ' ' + s.summary).toLowerCase().indexOf(q) >= 0;
      });
      if (!secs.length) return '';
      return '<div class="chapter"><h3><span class="dots"></span>' + esc(ch) + '</h3><div class="sec-grid">' +
        secs.map(function (s) {
          var m = /Consideration #(\d)/.exec(s.title);
          var head = m ? '<span class="cbadge">' + m[1] + '</span>' : '';
          var rolesLine = (s.roles && s.roles.length) ? '<div class="roles-line">For: ' + s.roles.map(roleName).join(' · ') + '</div>' : '';
          var nb = s.whatsNew ? '<span class="badge badge--new" title="' + esc(s.whatsNew) + '">New / expanded</span>' : '';
          return '<div class="sec' + (s.level === 2 ? ' is-sub' : '') + '"><div class="sec__top">' +
            '<h4 style="display:flex;gap:8px;align-items:center;margin:0">' + head + esc(s.title) + '</h4>' + pill(s.pages) + '</div>' +
            '<p>' + esc(s.summary) + '</p>' + nb + rolesLine + '</div>';
        }).join('') + '</div></div>';
    }).join('');
    exploreList.innerHTML = html || '<div class="empty">No sections match “' + esc(q) + '.”</div>';
  }

  /* ---------------- SHARE KIT ---------------- */
  $('#announce').innerHTML = '<h3>General announcement</h3><p>' + esc(D.shareKit.announcement) + '</p>' +
    '<button class="copybtn" data-copy="announce-text">Copy announcement</button>' +
    '<textarea id="announce-text" class="hidden" aria-hidden="true">' + esc(D.shareKit.announcement) + '</textarea>';
  $('#sharegrid').innerHTML = D.roles.map(function (r) {
    return '<div class="sharecard"><h4>' + esc(r.role) + '</h4><div class="audience">' + esc(r.audience) + '</div>' +
      '<p>' + esc(r.teaser) + '</p><button class="copybtn" data-copy="share-' + r.id + '">Copy teaser</button>' +
      '<textarea id="share-' + r.id + '" class="hidden" aria-hidden="true">' + esc(r.teaser) + '</textarea></div>';
  }).join('');

  /* ---------------- COPY ---------------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]'); if (!b) return;
    var ta = document.getElementById(b.getAttribute('data-copy')); if (!ta) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(ta.value).then(function () {
        var old = b.textContent; b.textContent = 'Copied ✓';
        setTimeout(function () { b.textContent = old; }, 1400);
      });
    }
  });

  /* ---------------- TABS ---------------- */
  function setTab(name) {
    $all('.tab').forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-tab') === name); });
    $all('.panel').forEach(function (p) { var on = p.id === name; p.classList.toggle('is-active', on); p.hidden = !on; });
  }
  $all('.tab').forEach(function (t) { t.addEventListener('click', function () { setTab(t.getAttribute('data-tab')); }); });
  $all('[data-go]').forEach(function (b) {
    b.addEventListener('click', function () { setTab(b.getAttribute('data-go')); var n = $('.nav'); if (n) n.scrollIntoView({ behavior: 'smooth' }); });
  });
  $('#search').addEventListener('input', function (e) {
    if ($('.panel.is-active').id !== 'explore') setTab('explore');
    renderExplore(e.target.value);
  });

  /* ---------------- INIT ---------------- */
  renderChangeFilters(); renderChanges(); renderExplore('');
  var role = (/role=([\w-]+)/.exec(location.hash) || [])[1];
  var tab = (/tab=([\w-]+)/.exec(location.hash) || [])[1];
  renderRole(role || D.roles[0].id);
  if (tab) setTab(tab);
})();
