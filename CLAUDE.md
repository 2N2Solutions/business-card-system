# Digital Business Card System

## Project Overview

A complete template system for creating professional digital business cards with admin panel, QR code generator, and multiple themes.

## Current Status

**Status**: Complete and ready for use

**Last Updated**: 2026-02-13

## Tech Stack

- Vanilla HTML/CSS/JavaScript (no frameworks)
- Static files (no server required)
- Node.js build script (optional)

## Key Files

| File | Purpose |
|------|---------|
| `template/index.html` | Base card template |
| `template/style.css` | All themes and responsive styles |
| `template/script.js` | Card functionality, vCard generation |
| `template/config-template.js` | Configuration schema |
| `admin/index.html` | Admin dashboard |
| `admin/generator.html` | Visual card generator |
| `admin/qr-generator.html` | QR code generation |
| `build/build-script.js` | CLI for creating new clients |

## Themes

5 themes implemented in `template/style.css`:
1. Professional (blue gradient)
2. Modern (purple gradient)
3. Minimal (grayscale)
4. Bold (dark with red accents)
5. Elegant (gold accents)

## Development Notes

- All icons are inline SVGs (no external icon library)
- Google Fonts: Inter (body) + Playfair Display (elegant theme)
- QR code uses cdn.jsdelivr.net/npm/qrcode library in admin panel
- vCard generation is client-side JavaScript

## Quick Commands

```bash
# Install dependencies
npm install

# Start admin panel
npm run serve:admin

# Preview an example
npx serve examples/sample-client

# Build a new client
npm run build
```

## Session History

### 2026-02-13 - Initial Build
- Created complete project structure
- Built responsive card template with 5 themes
- Created admin panel with card generator
- Added QR code generator with batch support
- Implemented vCard download functionality
- Created build script for client deployment
- Added 2 example clients (Rachel Branton, Alex Chen)
- Wrote comprehensive documentation
