# One I.T. Pro — Law Firms Landing Page

Independent static-site project for `law.oneitpro.com`.

## Deployment model

This project follows the reusable portion of the existing One I.T. Pro support-site pattern:

- GitHub repository with `main` as the production branch
- Cloudflare Pages Git integration
- no framework or build step
- repository root as the Pages output directory
- root-level `_headers` and `_redirects`
- custom domain: `law.oneitpro.com`

Suggested Cloudflare Pages settings:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | None |
| Build command | Leave blank |
| Build output directory | `/` |
| Root directory | `/` |

After the GitHub repository is connected, add `law.oneitpro.com` in the Cloudflare Pages **Custom domains** panel. Cloudflare should create or validate the required DNS record in the `oneitpro.com` zone. Do not create a second, competing DNS record manually.

## Current safety state

The approved campaign page retains both an HTML `noindex` directive and an `X-Robots-Tag: noindex, nofollow` header during staging. Remove both only after launch approval and production-domain validation. The canonical URL is `https://law.oneitpro.com/`.

The approved agent resources are `/llms.txt` and `/ai-law-firms.md`. Project-level `_headers` sets their content types explicitly.

## Local preview

Serve the repository root with any static HTTP server. For example:

```sh
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Chat and attribution

The landing page uses the live corporate site's One I.T. Pro Website Chatwoot SDK configuration. It does not modify the support site's inbox, routing, teams, labels or automations. The SDK is loaded only at `law.oneitpro.com`; until that domain is approved in the existing Chatwoot allowed-domain policy, the Chat With Us buttons open the corporate contact page as a fallback. Confirm native Chatwoot end to end on the live law domain before launch. Local preview uses the fallback.

The page preserves `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and `landing_page` from the arrival URL for the current session. It appends them to Bookings and corporate service links, and sets them as Chatwoot custom attributes when the widget is ready. The default `landing_page` is the canonical law subdomain.

No analytics vendor has been added. The page emits `oitp:analytics` DOM events with these names:

| Event | Trigger |
|---|---|
| `landing_page_visit` | Page load |
| `schedule_consultation` | Schedule a Consultation links |
| `chat_with_us` | Chat With Us buttons |
| `phone_click` | Phone links |
| `ai_governance_consultation` | Discuss AI Governance |
| `service_detail_click` | Corporate service-detail links; includes `service` |

Each event detail includes the five attribution fields. An approved analytics integration can listen for these events later.

## Intentionally not copied from `support-page`

- support routing, phone tree, or departmental contact details
- ScreenConnect/remote-assistance links
- support guides and embedded base64 images
- support-specific styling and content
- archived ZIP artifacts

The Chatwoot bootstrap in this repository was checked against the live corporate site rather than copied from the support repository.

## Pre-production checklist

- Review final copy, layout and legal language.
- Decide whether a campaign Open Graph image is needed; none is selected yet.
- Confirm all claims avoid legal-advice and compliance-guarantee language.
- Add approved consultation, phone, support, privacy, terms, and SMS destinations.
- Approve `law.oneitpro.com` in the existing Chatwoot website-inbox domain policy and validate chat there.
- Connect an approved analytics tool to the documented hooks when selected.
- Remove the HTML and header-level `noindex` directives.
- Validate desktop/mobile, keyboard access, contrast, headings, and forms.
- Validate headers and redirects on the actual `law.oneitpro.com` origin.
