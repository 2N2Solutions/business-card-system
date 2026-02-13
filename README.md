# Digital Business Card System

A complete system for creating professional digital business cards with an admin panel, QR code generator, and multiple themes.

## Features

- **Responsive Design**: Cards look great on any device
- **5 Professional Themes**: Professional, Modern, Minimal, Bold, Elegant
- **Custom Colors**: Override theme colors with your brand colors
- **QR Code Generator**: Generate QR codes for easy sharing
- **vCard Export**: One-tap contact saving
- **Social Media Integration**: Link all major platforms
- **Admin Panel**: Visual card generator with live preview
- **Easy Deployment**: Static files work anywhere

## Quick Start

```bash
# Install dependencies
npm install

# Start admin panel
npm run serve:admin

# Open http://localhost:3001
```

## Creating a New Card

### Option 1: Admin Panel

1. Start the admin server: `npm run serve:admin`
2. Navigate to Card Generator
3. Fill in the client information
4. Copy the generated config

### Option 2: Build Script

```bash
npm run build
# Follow the interactive prompts
```

### Option 3: Manual

1. Copy `template/config-template.js` to `clients/[name]/config.js`
2. Edit the configuration
3. Copy template HTML/CSS files
4. Deploy

## Project Structure

```
business-card-system/
├── template/          # Base template files
├── admin/             # Admin panel interface
├── clients/           # Generated client cards
├── examples/          # Example cards
├── assets/            # Shared images and icons
├── build/             # Build scripts
└── docs/              # Documentation
```

## Themes

| Theme | Description |
|-------|-------------|
| Professional | Blue gradient, clean corporate look |
| Modern | Purple gradient, contemporary feel |
| Minimal | Grayscale, no shadows, clean lines |
| Bold | Dark background with red accents |
| Elegant | Gold accents with serif typography |

## Configuration

See `template/config-template.js` for all available options:

- Personal information (name, title, company)
- Contact details (email, phone, website, location)
- Social media links
- Action buttons
- vCard data
- Analytics
- Custom colors

## Deployment

Cards are static HTML files. Deploy to any hosting service:

- GitHub Pages (free)
- Netlify (free tier)
- Vercel (free tier)
- AWS S3
- Any web hosting

See `docs/deployment-guide.md` for detailed instructions.

## Documentation

- [Setup Guide](docs/setup-guide.md)
- [Deployment Guide](docs/deployment-guide.md)
- [Client Instructions](docs/client-instructions.md)

## Examples

View example cards:

```bash
npx serve examples/rachel-branton
npx serve examples/sample-client
```

## License

MIT
