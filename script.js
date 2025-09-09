// Capture UTM params and append to the embedded Calendly link
(function () {
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","ref","gclid"];
  const utm = {};
  keys.forEach(k => {
    const v = params.get(k);
    if (v) utm[k] = v;
  });

  function appendUtmToCalendly() {
    const widget = document.querySelector(".calendly-inline-widget");
    if (!widget) return;
    const url = new URL(widget.getAttribute("data-url"));
    Object.entries(utm).forEach(([k, v]) => url.searchParams.set(k, v));
    widget.setAttribute("data-url", url.toString());
  }

  // Calendly loads async — retry a few times
  let tries = 0;
  const max = 20;
  const interval = setInterval(() => {
    tries++;
    appendUtmToCalendly();
    if (tries >= max) clearInterval(interval);
  }, 300);
})();
