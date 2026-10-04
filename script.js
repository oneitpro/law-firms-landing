// Campaign hooks emit local CustomEvents only. Connect an approved analytics tool later.
const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "landing_page"];
const CANONICAL_LANDING_PAGE = "https://law.oneitpro.com/";
const CORPORATE_CONTACT = "https://www.oneitpro.com/#contact";
const attribution = {};
const query = new URLSearchParams(window.location.search);

for (const key of ATTRIBUTION_KEYS) {
  const incoming = query.get(key);
  if (incoming && incoming.length <= 250) attribution[key] = incoming;
}
try {
  if (!ATTRIBUTION_KEYS.some(key => key !== "landing_page" && attribution[key])) {
    const previous = JSON.parse(sessionStorage.getItem("oitp_campaign_attribution") || "{}");
    for (const key of ATTRIBUTION_KEYS) {
      if (!attribution[key] && typeof previous[key] === "string") attribution[key] = previous[key];
    }
  }
  if (!attribution.landing_page) attribution.landing_page = CANONICAL_LANDING_PAGE;
  sessionStorage.setItem("oitp_campaign_attribution", JSON.stringify(attribution));
} catch {
  // The page and conversion paths still work when storage is unavailable.
}
if (!attribution.landing_page) attribution.landing_page = CANONICAL_LANDING_PAGE;

function emitEvent(name, extra = {}) {
  document.dispatchEvent(new CustomEvent("oitp:analytics", {
    detail: { event: name, ...attribution, ...extra }
  }));
}

function attributedUrl(rawUrl) {
  const url = new URL(rawUrl, location.href);
  for (const key of ATTRIBUTION_KEYS) {
    if (attribution[key]) url.searchParams.set(key, attribution[key]);
  }
  return url.toString();
}

document.querySelectorAll(".booking-link, [data-event='service_detail_click']").forEach(link => {
  link.href = attributedUrl(link.href);
});

document.querySelectorAll("[data-event]").forEach(control => {
  control.addEventListener("click", () => {
    emitEvent(control.dataset.event, control.dataset.service ? { service: control.dataset.service } : {});
  });
});

emitEvent("landing_page_visit");

const chatStatus = document.querySelector("#chat-status");
let chatReady = false;
window.addEventListener("chatwoot:ready", () => {
  chatReady = true;
  if (Object.keys(attribution).length && window.$chatwoot?.setCustomAttributes) {
    window.$chatwoot.setCustomAttributes(attribution);
  }
});

// The token and host match the current One I.T. Pro Website inbox on www.oneitpro.com.
// The native widget is left unstyled. The law subdomain must be allowed in Chatwoot before launch.
if (location.hostname === "law.oneitpro.com") {
  const sdk = document.createElement("script");
  sdk.src = "https://chat.oneitpro.com/packs/js/sdk.js";
  sdk.async = true;
  sdk.onload = () => window.chatwootSDK?.run({
    websiteToken: "WPAgNXztaznkoJkcKtCdh1bS",
    baseUrl: "https://chat.oneitpro.com"
  });
  document.head.appendChild(sdk);
}

document.querySelectorAll(".chat-trigger").forEach(button => {
  button.addEventListener("click", () => {
    if (chatReady && window.$chatwoot?.toggle) {
      window.$chatwoot.toggle("open");
      return;
    }
    chatStatus.textContent = "Opening One I.T. Pro chat on the main website.";
    window.open(attributedUrl(CORPORATE_CONTACT), "_blank", "noopener,noreferrer");
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
