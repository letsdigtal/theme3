# CALMA Theme — Client Handoff Guide

A complete skincare storefront built with React + Vite + Tailwind CSS v4.
Cart, routing, and checkout are fully functional in the browser (demo mode).

---

## 1. Run it on your computer

```bash
npm install
npm run dev      # opens at http://localhost:5173
npm run build    # creates the production folder: dist/
```

---

## 2. Where to edit what

| You want to change…            | Open this file              |
| ------------------------------ | --------------------------- |
| Products, prices, sizes, INCI  | `src/data.ts` → `products`  |
| Customer reviews               | `src/data.ts` → `reviews` + per-product `productReviews` |
| FAQ content                    | `src/data.ts` → `faqGroups` |
| Skin School articles           | `src/data.ts` → `journal`   |
| Ingredient index / values      | `src/data.ts` → `ingredientIndex`, `values` |
| Announcement bar text          | `src/layout.tsx`            |
| Header links, cart, footer     | `src/layout.tsx`            |
| Homepage sections              | `src/pages/Home.tsx`        |
| Shop filters/grid              | `src/pages/Shop.tsx`        |
| Product detail page            | `src/pages/Product.tsx`     |
| About + FAQ pages              | `src/pages/Static.tsx`      |
| **Brand colors + fonts**       | `src/index.css` → `@theme` block |
| Page title / favicon           | `index.html`                |

### Rebrand in 5 minutes
1. `index.html` — change the title and the Fraunces/Karla Google Fonts link.
2. `src/index.css` → `@theme` — swap the color tokens (`--color-aqua`, `--color-ink`, etc.). Every component uses these tokens, so one change recolors the whole site.
3. `src/data.ts` — replace brand name, email, phone, address, products, reviews.
4. Replace the image URLs in `src/data.ts` with your client's real product photography (keep similar proportions: 4:5 for products, 3:4 for the hero portrait, 4:3 for before/after).

---

## 3. Where to upload (deploy)

The build output is a plain static folder (`dist/`) — no server logic required.

- **Vercel / Netlify (recommended):** push the project to GitHub, import the repo, build command `npm run build`, output directory `dist`. Every push auto-deploys. Free tier is fine.
- **Cloudflare Pages / GitHub Pages:** same as above.
- **Traditional hosting (cPanel, Hostinger, SiteGround):** run `npm run build` locally, then upload the *contents* of `dist/` to `public_html/`. Point the client's domain at it.

---

## 4. Important: making it a REAL store

What you have now is a production-quality **front-end with a demo cart** (cart works,
persists in the browser, checkout is simulated — no money moves, no orders are stored).

To take client payments, pick one path:

1. **Shopify Storefront API (headless)** — keep this exact design, fetch products and
   create real checkouts through Shopify. Best for serious e-commerce clients.
2. **Snipcart / Lemon Squeezy** — add a few lines of JS; they handle cart + Stripe/PayPal
   on top of any static site. Fastest path from this build to live payments.
3. **Use it as the design spec** — recreate the look as a Shopify Liquid or
   WordPress/WooCommerce theme if the client wants a built-in admin panel to manage
   products themselves without touching code.

Also replace before going live: the demo order numbers, the newsletter submit
(wire to Mailchimp/Klaviyo), and the contact links (`hello@…` mailto).

---

## 5. Pre-launch checklist

- [ ] Client photography swapped into `src/data.ts`
- [ ] Legal pages written (refund policy, privacy) — add as new FAQ groups or pages
- [ ] Newsletter endpoint connected
- [ ] Analytics added (`index.html`)
- [ ] Domain + SSL configured
- [ ] Payment path chosen (Section 4)
- [ ] `npm run build` → deploy `dist/`
