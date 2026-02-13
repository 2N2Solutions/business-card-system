# Digital Business Card System - Setup Guide

## Overview

This system allows you to create professional digital business cards that can be shared via QR codes or direct links. Each card is fully customizable with multiple themes, contact information, social links, and call-to-action buttons.

## Quick Start

### 1. Install Dependencies

```bash
cd business-card-system
npm install
```

### 2. Create a New Client Card

**Option A: Using the Admin Panel**

1. Start the admin server:
   ```bash
   npm run serve:admin
   ```
2. Open http://localhost:3001 in your browser
3. Navigate to "Card Generator"
4. Fill in the client information
5. Copy the generated configuration

**Option B: Using the Build Script**

```bash
npm run build
```

Follow the interactive prompts to create a new client.

**Option C: Manual Creation**

1. Create a new folder in `clients/` with the client name:
   ```bash
   mkdir clients/john-smith
   ```

2. Copy the template config:
   ```bash
   cp template/config-template.js clients/john-smith/config.js
   ```

3. Edit `config.js` with the client's information

4. Build the client:
   ```bash
   npm run build:client -- john-smith
   ```

### 3. Preview Your Card

```bash
npx serve examples/sample-client
```

Open http://localhost:3000 in your browser.

## Project Structure

```
business-card-system/
├── template/           # Base template files
│   ├── index.html     # Card HTML structure
│   ├── style.css      # Styles with theme support
│   ├── script.js      # Card functionality
│   └── config-template.js
├── admin/             # Admin panel
│   ├── index.html     # Dashboard
│   ├── generator.html # Card generator
│   └── qr-generator.html
├── clients/           # Client card folders
├── examples/          # Example cards
├── assets/            # Shared assets
├── build/             # Build scripts
└── docs/              # Documentation
```

## Configuration Options

### Personal Information

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Full name |
| `title` | string | Yes | Job title |
| `company` | string | Yes | Company name |
| `tagline` | string | No | Personal tagline |
| `avatar` | string | No | Profile image URL |

### Themes

Available themes:
- `professional` - Blue gradient, clean design
- `modern` - Purple gradient, contemporary feel
- `minimal` - Grayscale, no shadows
- `bold` - Dark background with red accents
- `elegant` - Gold accents with serif fonts

### Custom Colors

```javascript
customColors: {
  enabled: true,
  primary: "#2563eb",
  secondary: "#1e40af",
  accent: "#3b82f6",
  background: "#ffffff",
  text: "#1f2937",
  textLight: "#6b7280"
}
```

### Contact Information

```javascript
contact: {
  email: "email@example.com",
  phone: "+1 (555) 123-4567",
  website: "https://yourwebsite.com",
  location: "City, State"
}
```

### Social Media

Supported platforms:
- LinkedIn
- Twitter/X
- Instagram
- Facebook
- GitHub
- YouTube
- TikTok
- Dribbble
- Behance

### Action Buttons

Available action types:
- `vcard` - Download contact card
- `email` - Open email client
- `phone` - Initiate phone call
- `website` - Open website
- `sms` - Open SMS app
- `whatsapp` - Open WhatsApp
- `share` - Share card link
- `custom` - Custom URL

## vCard Configuration

The vCard is automatically generated for contact downloads:

```javascript
vcard: {
  firstName: "John",
  lastName: "Smith",
  organization: "Company Name",
  title: "Job Title",
  email: "email@example.com",
  phone: "+15551234567",
  website: "https://example.com",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA"
  },
  note: "Met via digital business card"
}
```

## Analytics

Enable Google Analytics tracking:

```javascript
analytics: {
  enabled: true,
  googleAnalyticsId: "G-XXXXXXXXXX"
}
```

## Next Steps

- See [Deployment Guide](deployment-guide.md) for hosting options
- See [Client Instructions](client-instructions.md) for sharing with clients
