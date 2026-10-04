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

The current page is a deployment-safe holding page, not the final law-firm campaign. It intentionally emits both an HTML `noindex` directive and an `X-Robots-Tag: noindex, nofollow` header. Remove both only when the final content, metadata, legal review, analytics, conversion actions, and production-domain validation are approved.

## Local preview

Serve the repository root with any static HTTP server. For example:

```sh
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Intentionally not copied from `support-page`

- Chatwoot token or bootstrap code
- support routing, phone tree, or departmental contact details
- ScreenConnect/remote-assistance links
- support guides and embedded base64 images
- support-specific styling and content
- archived ZIP artifacts

If chat is later approved for this site, load the existing corporate Chatwoot integration from a shared, reviewed source and validate `law.oneitpro.com` against the allowed-domain policy. Do not copy a public token from another repository by hand.

## Pre-production checklist

- Replace the holding-page content with approved law-firm Map H content.
- Add final title, description, canonical, Open Graph image, and structured data.
- Confirm all claims avoid legal-advice and compliance-guarantee language.
- Add approved consultation, phone, support, privacy, terms, and SMS destinations.
- Decide whether Chatwoot and analytics are in scope.
- Remove the HTML and header-level `noindex` directives.
- Validate desktop/mobile, keyboard access, contrast, headings, and forms.
- Validate headers and redirects on the actual `law.oneitpro.com` origin.

