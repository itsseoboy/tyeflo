# TyeFlo — Font Generator

A free, open-source Unicode font generator built with Next.js 16. Convert
text into 200+ fancy Unicode fonts — cool, fancy, cursive, small, bold,
glitch, symbol, and more. Copy and paste anywhere online.

## Features

- **200+ font styles** across 11 cluster categories
- **Copy & paste** — click any font to copy to clipboard
- **Real-time preview** — type once, see all styles instantly
- **Mobile-friendly** — responsive on every device
- **Privacy first** — all transforms happen client-side, nothing stored
- **No sign-up** — free forever, no watermark, no daily limit
- **SEO optimized** — JSON-LD structured data, sitemap, robots.txt
- **11 dedicated cluster pages** — each with its own fonts + FAQ
- **Internal linking** — related generators linked on every page
- **Accessibility** — skip link, ARIA labels, keyboard navigation

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript 5
- Tailwind CSS 4 + shadcn/ui
- Prisma ORM (SQLite)
- MDX for content
- Lucide icons

## Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Set up the database
bun run db:push

# 3. Start the dev server
bun run dev
```

Open http://localhost:3000 in your browser.

## Production Deployment

### Build
```bash
bun run build
bun run start
```

### HTTPS (production)
The app enforces HTTPS in production via:
- `next.config.ts` — HTTP→HTTPS redirect when `NODE_ENV=production`
- `Strict-Transport-Security` header (HSTS, 2 years)
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)

### Using Caddy (recommended for auto-HTTPS)
```bash
# Edit Caddyfile — uncomment the production block and set your domain
# Then start Caddy:
caddy run --config Caddyfile
```

Caddy automatically provisions and renews Let's Encrypt certificates.

### Using Nginx (alternative)
```nginx
server {
    listen 80;
    server_name tyeflo.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tyeflo.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout + JSON-LD schemas
│   │   ├── page.tsx               # Homepage
│   │   ├── sitemap.ts             # Dynamic sitemap.xml
│   │   ├── robots.ts               # robots.txt
│   │   ├── {cluster}-font-generator/page.tsx  # 11 cluster pages
│   │   ├── terms/                 # Terms of Service
│   │   ├── privacy/               # Privacy Policy
│   │   └── contact/               # Contact page
│   ├── components/
│   │   ├── font-tool.tsx          # Main font generator tool
│   │   ├── font-row.tsx           # Single font row (memoized)
│   │   ├── category-page-layout.tsx  # Shared cluster page layout
│   │   ├── clipboard-bar.tsx      # Sticky clipboard bar
│   │   ├── header.tsx / footer.tsx
│   │   ├── hero.tsx               # Homepage hero
│   │   ├── rotating-word.tsx     # Typewriter animation
│   │   ├── seo-content-v2.tsx     # Homepage SEO content (15 sections)
│   │   └── ui/                    # shadcn/ui components
│   └── lib/
│       ├── fonts.ts               # Unicode font engine + 11 clusters
│       ├── seo.ts                 # Rank Math equivalent schemas
│       ├── mdx-loader.ts          # MDX content loader
│       └── db.ts                  # Prisma client
├── content/
│   └── homepage/*.mdx             # Editable content sections
├── public/
│   ├── how-it-works-step-{1-5}.webp
│   ├── why-choose-us-features.webp
│   └── logo.svg
├── prisma/
│   └── schema.prisma
├── Caddyfile                      # Gateway + HTTPS config
└── next.config.ts                 # HTTP→HTTPS redirect + security headers
```

## Customization

### Edit content
All homepage content is in `content/homepage/*.mdx` — edit with any text editor.

### Add a font
Add the transform function in `src/lib/fonts.ts` and add it to the `FONT_STYLES` array.

### Add a cluster page
1. Create `src/app/{slug}/page.tsx` using `CategoryPageLayout`
2. Add the cluster to `FONT_CLUSTERS` in `fonts.ts`
3. Add to `sitemap.ts`

## License

MIT — free to use, modify, and distribute.

---

Built with ❤️ by TyeFlo.
hello