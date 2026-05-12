# ProdKeys - Nintendo Switch Prod Keys Download

> Download the latest Nintendo Switch prod.keys & title.keys for all emulators. Free, fast, always up to date.

🌐 **Live Site**: [prodkeys.anydoor.cc](https://prodkeys.anydoor.cc)

🔗 **Companion Site**: <img src="https://switchfirmware.org/assets/brand/logo-mark.svg" width="20" height="20" valign="middle" /> [SwitchFirmware.org](https://switchfirmware.org/) — Nintendo Switch firmware downloads with MD5/SHA-256 verification, emulator setup guides and troubleshooting.

---

## About

**ProdKeys** is a fast, clean, and SEO-optimized Nintendo Switch prod keys download site. It provides the latest `prod.keys` and `title.keys` files for all major Switch emulators including Ryujinx, Yuzu, Eden, Suyu, Sudachi, Citron, Skyline, and more.

### Why ProdKeys?

- **Always Up to Date** — Latest keys (v22.1.0) available immediately after release
- **Full Version History** — All versions from v16.0.0 to v22.1.0 with download links
- **Verified Files** — MD5 checksums and file sizes for every download
- **Individual Version Pages** — Each version has its own dedicated page with installation guide
- **SEO First** — JSON-LD structured data, Open Graph meta, sitemap.xml, robots.txt
- **Dark Theme** — GitHub-inspired dark UI with Inter + JetBrains Mono fonts
- **Fast & Lightweight** — Static site built with Eleventy, no JavaScript frameworks
- **Free Forever** — No ads, no paywalls, no accounts required

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Static Site Generator | [Eleventy (11ty)](https://www.11ty.dev/) v3 |
| Template Engine | Nunjucks (.njk) |
| Styling | Custom CSS (CSS Variables, Dark Theme) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) |
| Domain | `prodkeys.anydoor.cc` |
| Data Pipeline | Node.js script → JSON → Eleventy templates |

---

## Project Structure

```
├── eleventy.config.js      # Eleventy configuration & passthrough copies
├── package.json             # Dependencies & build scripts
├── scripts/
│   └── generate-versions.js # Scan prodkeys/ dir → versions.json
├── src/
│   ├── _data/
│   │   ├── site.json        # Site metadata (URL, name, description)
│   │   └── versions.json    # Auto-generated version data (26 versions)
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk     # Base HTML layout
│   │   └── partials/
│   │       ├── head.njk     # SEO meta, OG, JSON-LD, fonts
│   │       ├── header.njk   # Fixed navbar with SVG logo
│   │       └── footer.njk   # 3-column grid footer
│   ├── downloads/
│   │   └── index.njk        # Version detail pages (paginated)
│   ├── assets/
│   │   ├── css/style.css    # Full dark theme CSS
│   │   └── js/main.js       # Scroll-based nav highlighting
│   ├── index.njk            # Homepage (Hero + Features + Table + FAQ)
│   ├── sitemap.njk          # sitemap.xml generation
│   └── robots.njk           # robots.txt generation
├── prodkeys/                # Key files (zip archives)
└── _site/                   # Build output (gitignored)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+

### Install & Run

```bash
# Clone the repository
git clone git@github.com:iostreamrain/prodkeys.git
cd prodkeys

# Install dependencies
npm install

# Generate version data & build
npm run generate

# Start local dev server
npm start
```

### Build for Production

```bash
npm run build
```

Output goes to `_site/`.

---

## Cloudflare Pages Deployment

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Build Output Directory | `_site` |
| Environment Variables | None |
| Custom Domain | `prodkeys.anydoor.cc` |

---

## SEO Features

| Feature | Implementation |
|---------|---------------|
| JSON-LD Structured Data | `SoftwareApplication` + `FAQPage` schema |
| Open Graph Meta | Title, description, image, URL |
| Sitemap | Auto-generated `sitemap.xml` with 27 URLs |
| Robots.txt | Auto-generated with sitemap reference |
| Canonical URLs | Set on all pages |
| Individual Version Pages | 26 dedicated pages with unique titles & descriptions |
| HTTP Security Headers | Via `_headers` file (CSP, HSTS, X-Frame-Options) |
| Force Download | `.zip` files served with `Content-Disposition: attachment` |

---

## Related Projects

- [SwitchFirmware](https://switchfirmware.org/) — Nintendo Switch Firmware Download Site (companion project)

---

## License

This project is for educational purposes only. Nintendo Switch and all related trademarks are property of Nintendo. We are not affiliated with Nintendo.
