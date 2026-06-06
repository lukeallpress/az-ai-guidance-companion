/* Optional usage analytics → Supabase REST. No-op until meta.analytics is filled in
   (data.js). Privacy: anonymous random session id, no personal data; insert-only.
   Exposes window.AZtrack(event, props) which app.js / reader.js call. */
(function () {
  var cfg = (window.AZ_DATA && window.AZ_DATA.meta && window.AZ_DATA.meta.analytics) || {};
  var enabled = !!(cfg.supabaseUrl && cfg.supabaseAnonKey);
  var endpoint = enabled ? cfg.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/" + (cfg.table || "events") : null;
  var embedded = (function () { try { return window.self !== window.top; } catch (_) { return true; } })();

  function sid() {
    try {
      var k = "az_sid", v = localStorage.getItem(k);
      if (!v) { v = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + "-" + Math.random().toString(16).slice(2)); localStorage.setItem(k, v); }
      return v;
    } catch (_) { return "anon"; }
  }
  var SID = sid();

  window.AZtrack = function (event, props) {
    if (!enabled) return;
    try {
      var row = {
        session_id: SID,
        event: String(event),
        role: (props && props.role) || null,
        page: (props && typeof props.page === "number") ? props.page : null,
        props: props || {},
        path: location.pathname,
        embedded: embedded
      };
      fetch(endpoint, {
        method: "POST",
        keepalive: true,
        headers: {
          apikey: cfg.supabaseAnonKey,
          Authorization: "Bearer " + cfg.supabaseAnonKey,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify(row)
      }).catch(function () {});
    } catch (_) {}
  };

  if (enabled) window.AZtrack("session_start", { ref: document.referrer || null });
})();
