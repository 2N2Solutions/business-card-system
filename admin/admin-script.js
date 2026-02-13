/**
 * Digital Business Card - Admin Panel Scripts
 */

(function() {
  'use strict';

  // =====================================================
  // CARD GENERATOR
  // =====================================================

  const cardForm = document.getElementById('cardForm');
  const outputModal = document.getElementById('outputModal');
  const configOutput = document.getElementById('configOutput');
  const copyBtn = document.getElementById('copyBtn');
  const closeModal = document.getElementById('closeModal');
  const customColorsCheckbox = document.getElementById('customColors');
  const customColorInputs = document.getElementById('customColorInputs');
  const previewBtn = document.getElementById('previewBtn');
  const previewIframe = document.getElementById('previewIframe');
  const deviceBtns = document.querySelectorAll('.device-btn');
  const previewFrame = document.getElementById('previewFrame');

  // Toggle custom colors
  if (customColorsCheckbox) {
    customColorsCheckbox.addEventListener('change', function() {
      customColorInputs.classList.toggle('hidden', !this.checked);
    });
  }

  // Sync color inputs with text inputs
  document.querySelectorAll('.color-input').forEach(container => {
    const colorInput = container.querySelector('input[type="color"]');
    const textInput = container.querySelector('input[type="text"]');

    if (colorInput && textInput) {
      colorInput.addEventListener('input', () => {
        textInput.value = colorInput.value;
      });

      textInput.addEventListener('input', () => {
        if (/^#[0-9A-Fa-f]{6}$/.test(textInput.value)) {
          colorInput.value = textInput.value;
        }
      });
    }
  });

  // Device toggle for preview
  if (deviceBtns.length > 0) {
    deviceBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        deviceBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const device = this.dataset.device;
        previewFrame.className = `preview-frame ${device}`;
      });
    });
  }

  // Generate configuration
  if (cardForm) {
    cardForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const config = generateConfig();
      const configStr = formatConfig(config);
      configOutput.textContent = configStr;
      outputModal.classList.add('show');
    });
  }

  // Preview button
  if (previewBtn) {
    previewBtn.addEventListener('click', function() {
      updatePreview();
    });

    // Auto-preview on input change (debounced)
    let previewTimeout;
    cardForm?.addEventListener('input', function() {
      clearTimeout(previewTimeout);
      previewTimeout = setTimeout(updatePreview, 500);
    });
  }

  // Close modal
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      outputModal.classList.remove('show');
    });

    outputModal?.addEventListener('click', function(e) {
      if (e.target === outputModal) {
        outputModal.classList.remove('show');
      }
    });
  }

  // Copy config
  if (copyBtn) {
    copyBtn.addEventListener('click', async function() {
      try {
        await navigator.clipboard.writeText(configOutput.textContent);
        this.textContent = 'Copied!';
        setTimeout(() => {
          this.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });
  }

  /**
   * Generate configuration object from form
   */
  function generateConfig() {
    const formData = new FormData(cardForm);
    const theme = formData.get('theme') || 'professional';

    const config = {
      name: formData.get('name') || '',
      title: formData.get('title') || '',
      company: formData.get('company') || '',
      tagline: formData.get('tagline') || '',
      avatar: formData.get('avatar') || '../assets/images/default-avatar.png',
      theme: theme,
      customColors: {
        enabled: customColorsCheckbox?.checked || false,
        primary: formData.get('colorPrimary') || '#2563eb',
        secondary: formData.get('colorSecondary') || '#1e40af'
      },
      contact: {
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        website: formData.get('website') || '',
        location: formData.get('location') || ''
      },
      social: {
        linkedin: formData.get('linkedin') || '',
        twitter: formData.get('twitter') || '',
        instagram: formData.get('instagram') || '',
        facebook: formData.get('facebook') || '',
        github: formData.get('github') || '',
        youtube: formData.get('youtube') || ''
      },
      actions: [],
      vcard: {
        firstName: (formData.get('name') || '').split(' ')[0],
        lastName: (formData.get('name') || '').split(' ').slice(1).join(' '),
        organization: formData.get('company') || '',
        title: formData.get('title') || '',
        email: formData.get('email') || '',
        phone: (formData.get('phone') || '').replace(/[^\d+]/g, ''),
        website: formData.get('website') || ''
      },
      footer: {
        showPoweredBy: true
      }
    };

    // Build actions based on checkboxes
    if (formData.get('actionVcard')) {
      config.actions.push({ label: 'Save Contact', type: 'vcard', icon: 'download' });
    }
    if (formData.get('actionEmail') && config.contact.email) {
      config.actions.push({ label: 'Send Email', type: 'email', icon: 'mail' });
    }
    if (formData.get('actionPhone') && config.contact.phone) {
      config.actions.push({ label: 'Call Now', type: 'phone', icon: 'phone' });
    }
    if (formData.get('actionWebsite') && config.contact.website) {
      config.actions.push({ label: 'Visit Website', type: 'website', icon: 'globe' });
    }

    return config;
  }

  /**
   * Format config as JavaScript code
   */
  function formatConfig(config) {
    const lines = [
      '/**',
      ' * Business Card Configuration',
      ` * Generated: ${new Date().toISOString()}`,
      ' */',
      'const cardConfig = ' + JSON.stringify(config, null, 2) + ';',
      '',
      "// Export for module usage",
      "if (typeof module !== 'undefined' && module.exports) {",
      '  module.exports = cardConfig;',
      '}'
    ];

    return lines.join('\n');
  }

  /**
   * Update live preview
   */
  function updatePreview() {
    if (!previewIframe) return;

    const config = generateConfig();
    const html = generatePreviewHTML(config);

    previewIframe.srcdoc = html;
  }

  /**
   * Generate preview HTML
   */
  function generatePreviewHTML(config) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${getPreviewStyles(config)}
  </style>
</head>
<body>
  <div class="card-container">
    <div class="card">
      <header class="card-header">
        <img src="${config.avatar}" alt="" class="avatar" onerror="this.style.display='none'">
        <h1 class="name">${config.name || 'Your Name'}</h1>
        <p class="title">${config.title || 'Your Title'}</p>
        <p class="company">${config.company || 'Company'}</p>
        ${config.tagline ? `<p class="tagline">${config.tagline}</p>` : ''}
      </header>
      <section class="contact-info">
        ${config.contact.email ? `<div class="contact-item">${config.contact.email}</div>` : ''}
        ${config.contact.phone ? `<div class="contact-item">${config.contact.phone}</div>` : ''}
        ${config.contact.location ? `<div class="contact-item">${config.contact.location}</div>` : ''}
      </section>
      <section class="actions">
        ${config.actions.map(a => `<button class="action-btn">${a.label}</button>`).join('')}
      </section>
    </div>
  </div>
</body>
</html>`;
  }

  /**
   * Get preview styles based on theme
   */
  function getPreviewStyles(config) {
    const themes = {
      professional: { primary: '#2563eb', secondary: '#1e40af' },
      modern: { primary: '#8b5cf6', secondary: '#7c3aed' },
      minimal: { primary: '#374151', secondary: '#1f2937' },
      bold: { primary: '#dc2626', secondary: '#b91c1c' },
      elegant: { primary: '#b8860b', secondary: '#996515' }
    };

    let primary = themes[config.theme]?.primary || themes.professional.primary;
    let secondary = themes[config.theme]?.secondary || themes.professional.secondary;

    if (config.customColors?.enabled) {
      primary = config.customColors.primary;
      secondary = config.customColors.secondary;
    }

    return `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: #f8fafc;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }
      .card-container { width: 100%; max-width: 380px; }
      .card {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1);
        overflow: hidden;
      }
      .card-header {
        text-align: center;
        padding: 2rem 1.5rem 1.5rem;
        background: linear-gradient(180deg, ${primary} 0%, ${secondary} 100%);
        color: white;
        position: relative;
      }
      .card-header::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
        height: 40px;
        background: white;
        border-radius: 50% 50% 0 0 / 100% 100% 0 0;
      }
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid white;
        margin: 0 auto 0.75rem;
        display: block;
        position: relative;
        z-index: 1;
      }
      .name { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.25rem; position: relative; z-index: 1; }
      .title { font-size: 0.875rem; opacity: 0.9; position: relative; z-index: 1; }
      .company { font-size: 0.75rem; opacity: 0.8; position: relative; z-index: 1; }
      .tagline { font-size: 0.75rem; font-style: italic; opacity: 0.7; margin-top: 0.5rem; position: relative; z-index: 1; }
      .contact-info { padding: 1rem 1.5rem; }
      .contact-item { font-size: 0.8125rem; color: #6b7280; padding: 0.5rem 0; border-bottom: 1px solid #f3f4f6; }
      .contact-item:last-child { border-bottom: none; }
      .actions { padding: 0.75rem 1.5rem 1.5rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
      .action-btn {
        padding: 0.625rem 0.75rem;
        background: ${primary};
        color: white;
        border: none;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-weight: 500;
        cursor: pointer;
      }
      .actions .action-btn:last-child:nth-child(odd) { grid-column: span 2; }
    `;
  }

  // =====================================================
  // QR CODE GENERATOR
  // =====================================================

  const qrForm = document.getElementById('qrForm');
  const qrPreview = document.getElementById('qrPreview');
  const qrActions = document.getElementById('qrActions');
  const downloadQrBtn = document.getElementById('downloadQr');
  const copyQrUrlBtn = document.getElementById('copyQrUrl');
  const batchGenerate = document.getElementById('batchGenerate');
  const batchUrls = document.getElementById('batchUrls');
  const batchResults = document.getElementById('batchResults');
  const batchGrid = document.getElementById('batchGrid');

  let currentQrDataUrl = null;
  let currentQrFilename = 'qr-code';

  if (qrForm) {
    qrForm.addEventListener('submit', function(e) {
      e.preventDefault();
      generateQRCode();
    });
  }

  /**
   * Generate QR code
   */
  async function generateQRCode() {
    if (typeof QRCode === 'undefined') {
      alert('QR Code library not loaded. Please refresh the page.');
      return;
    }

    const url = document.getElementById('qrUrl').value.trim();
    if (!url) return;

    const size = parseInt(document.getElementById('qrSize').value);
    const format = document.getElementById('qrFormat').value;
    const foreground = document.getElementById('qrForeground').value;
    const background = document.getElementById('qrBackground').value;
    const errorCorrection = document.getElementById('qrErrorCorrection').value;
    const includeMargin = document.getElementById('qrIncludeMargin').checked;

    const options = {
      width: size,
      margin: includeMargin ? 4 : 0,
      color: {
        dark: foreground,
        light: background
      },
      errorCorrectionLevel: errorCorrection
    };

    try {
      // Clear previous
      qrPreview.innerHTML = '';

      if (format === 'svg') {
        const svgString = await QRCode.toString(url, { ...options, type: 'svg' });
        qrPreview.innerHTML = svgString;
        currentQrDataUrl = 'data:image/svg+xml;base64,' + btoa(svgString);
      } else {
        const canvas = document.createElement('canvas');
        await QRCode.toCanvas(canvas, url, options);
        qrPreview.appendChild(canvas);
        currentQrDataUrl = canvas.toDataURL('image/png');
      }

      // Extract filename from URL
      try {
        const urlObj = new URL(url);
        currentQrFilename = urlObj.pathname.split('/').filter(Boolean).pop() || 'qr-code';
      } catch {
        currentQrFilename = 'qr-code';
      }

      qrActions.classList.remove('hidden');
    } catch (err) {
      console.error('QR generation failed:', err);
      qrPreview.innerHTML = '<p style="color: #ef4444;">Failed to generate QR code. Please check the URL.</p>';
    }
  }

  // Download QR code
  if (downloadQrBtn) {
    downloadQrBtn.addEventListener('click', function() {
      if (!currentQrDataUrl) return;

      const format = document.getElementById('qrFormat').value;
      const link = document.createElement('a');
      link.download = `${currentQrFilename}.${format}`;
      link.href = currentQrDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Copy data URL
  if (copyQrUrlBtn) {
    copyQrUrlBtn.addEventListener('click', async function() {
      if (!currentQrDataUrl) return;

      try {
        await navigator.clipboard.writeText(currentQrDataUrl);
        this.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Copied!
        `;
        setTimeout(() => {
          this.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy Data URL
          `;
        }, 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });
  }

  // Batch generate
  if (batchGenerate) {
    batchGenerate.addEventListener('click', async function() {
      const urls = batchUrls.value.split('\n').map(u => u.trim()).filter(Boolean);
      if (urls.length === 0) return;

      const size = parseInt(document.getElementById('qrSize').value);
      const foreground = document.getElementById('qrForeground').value;
      const background = document.getElementById('qrBackground').value;
      const errorCorrection = document.getElementById('qrErrorCorrection').value;

      batchGrid.innerHTML = '';
      batchResults.classList.remove('hidden');

      for (const url of urls) {
        try {
          const canvas = document.createElement('canvas');
          await QRCode.toCanvas(canvas, url, {
            width: Math.min(size, 256),
            margin: 2,
            color: { dark: foreground, light: background },
            errorCorrectionLevel: errorCorrection
          });

          const item = document.createElement('div');
          item.className = 'batch-item';
          item.appendChild(canvas);

          const label = document.createElement('p');
          let shortUrl = url;
          try {
            const urlObj = new URL(url);
            shortUrl = urlObj.pathname.split('/').filter(Boolean).pop() || url;
          } catch {}
          label.textContent = shortUrl;
          item.appendChild(label);

          batchGrid.appendChild(item);
        } catch (err) {
          console.error('Failed to generate QR for:', url, err);
        }
      }
    });
  }

  // Download all as ZIP (simplified - just downloads individual files)
  const downloadAllBtn = document.getElementById('downloadAllBtn');
  if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', function() {
      const canvases = batchGrid.querySelectorAll('canvas');
      canvases.forEach((canvas, index) => {
        const link = document.createElement('a');
        link.download = `qr-code-${index + 1}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  }

  // Sync QR color inputs
  ['qrForeground', 'qrBackground'].forEach(id => {
    const colorInput = document.getElementById(id);
    const textInput = document.getElementById(id + 'Text');

    if (colorInput && textInput) {
      colorInput.addEventListener('input', () => {
        textInput.value = colorInput.value;
      });

      textInput.addEventListener('input', () => {
        if (/^#[0-9A-Fa-f]{6}$/.test(textInput.value)) {
          colorInput.value = textInput.value;
        }
      });
    }
  });

})();
