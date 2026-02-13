# Digital Business Card System

## Project Overview

A complete template system for creating professional digital business cards with admin panel, QR code generator, and multiple themes.

## Current Status

**Status**: Feature complete, ready for use
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

## Features

- **5 Themes**: Professional, Modern, Minimal, Bold, Elegant
- **Company Logo**: Displays in top-right of card header
- **vCard Export**: One-tap contact saving
- **QR Code Generator**: Single and batch generation
- **Responsive Design**: Mobile-first, works on all devices
- **Custom Colors**: Override theme colors with brand colors

## Quick Commands

```bash
# Install dependencies
npm install

# Start admin panel
npm run serve:admin
# Opens at http://localhost:3001

# Preview an example
npx serve examples/sample-client

# Build a new client
npm run build
```

## GitHub Repository

https://github.com/2N2Solutions/business-card-system

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
- **Commit**: `f907e96` - Initial commit

### 2026-02-13 - Logo Feature
- Added company logo support to cards
- Logo displays in top-right corner of header
- Added logo input to admin generator
- Updated preview to show logo
- **Commit**: `7070bf3` - Add company logo feature

## Next Steps (When Resuming)

- Add more example clients with logos
- Consider adding logo position options (left/right/center)
- Add image upload capability to admin panel
- Consider PWA support for offline viewing
