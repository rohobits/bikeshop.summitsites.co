// Capture UTM params and append to Calendly URL
(function () {
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","ref","gclid"];
  const utm = {};
  utmKeys.forEach(k => {
    const v = params.get(k);
    if (v) utm[k] = v;
  });

  function appendUtm() {
    const widget = document.querySelector(".calendly-inline-widget");
    if (!widget) return;
    const url = new URL(widget.getAttribute("data-url"));
    Object.entries(utm).forEach(([k, v]) => url.searchParams.set(k, v));
    widget.setAttribute("data-url", url.toString());
  }

  let tries = 0;
  const max = 20;
  const interval = setInterval(() => {
    tries++;
    appendUtm();
    if (tries >= max) clearInterval(interval);
  }, 300);
})();
