# Deployment Guide

## Overview

Digital business cards are static HTML files that can be hosted on any web server or static hosting service.

## Deployment Options

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository for the client
2. Push the client folder contents to the repository
3. Enable GitHub Pages in repository settings
4. Card will be available at `https://username.github.io/repo-name`

**Steps:**
```bash
cd clients/john-smith
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/john-smith-card.git
git push -u origin main
```

Then enable Pages in Settings > Pages > Source: main branch.

### Option 2: Netlify (Free tier available)

1. Create a Netlify account
2. Drag and drop the client folder to Netlify dashboard
3. Or connect to a Git repository for automatic deployments

**CLI Deployment:**
```bash
npm install -g netlify-cli
cd clients/john-smith
netlify deploy --prod
```

### Option 3: Vercel (Free tier available)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd clients/john-smith
   vercel --prod
   ```

### Option 4: AWS S3 + CloudFront

For enterprise deployments with custom domains and CDN:

1. Create an S3 bucket with static website hosting enabled
2. Upload client files to the bucket
3. Configure CloudFront distribution for HTTPS and caching
4. Point your custom domain to CloudFront

### Option 5: Traditional Web Hosting

Upload the client folder contents via FTP/SFTP to any web hosting service:
- Bluehost
- GoDaddy
- SiteGround
- DigitalOcean
- etc.

## File Structure for Deployment

Each client folder should contain:
```
john-smith/
├── index.html
├── style.css
├── script.js
├── config.js
└── assets/
    └── images/
        └── profile.jpg  (optional)
```

## Custom Domains

### Setting Up a Custom Domain

1. Register a domain (or use a subdomain)
2. Configure DNS to point to your hosting provider
3. Enable HTTPS (most providers do this automatically)

**Recommended URL patterns:**
- `card.yourcompany.com/john-smith`
- `john-smith.cards.yourcompany.com`
- `yourcompany.com/team/john-smith`

### SSL/HTTPS

Always use HTTPS for business cards. Most modern hosting providers include free SSL certificates via Let's Encrypt.

## Performance Optimization

### Before Deployment

1. **Optimize images**: Use WebP format and appropriate sizes
   ```bash
   # Example using ImageMagick
   convert profile.jpg -resize 400x400 -quality 85 profile.webp
   ```

2. **Minify CSS/JS** (optional - files are already small):
   ```bash
   npx cssnano style.css style.min.css
   npx terser script.js -o script.min.js
   ```

### Caching Headers

Configure your server to cache static assets:

```
# .htaccess for Apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
</IfModule>
```

## QR Code Integration

After deployment:

1. Go to the Admin Panel > QR Generator
2. Enter the deployed URL
3. Generate and download the QR code
4. Use the QR code on:
   - Physical business cards
   - Email signatures
   - Marketing materials
   - Trade show displays

## Monitoring

### Google Analytics

Enable analytics in the card configuration:

```javascript
analytics: {
  enabled: true,
  googleAnalyticsId: "G-XXXXXXXXXX"
}
```

Track:
- Page views
- Button clicks
- Contact downloads
- Social link clicks

## Troubleshooting

### Common Issues

**Card not loading:**
- Check that all files are uploaded
- Verify file paths in index.html
- Check browser console for errors

**Styles not applying:**
- Clear browser cache
- Check CSS file path
- Verify theme name in config

**vCard not downloading:**
- Check that config.js is loaded
- Verify vcard data in configuration
- Test in different browsers

**Images not showing:**
- Check image URL is accessible
- Verify CORS settings if using external images
- Use relative paths for local images
