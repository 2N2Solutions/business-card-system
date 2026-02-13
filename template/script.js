/**
 * Digital Business Card - Main Script
 * Handles card rendering, vCard generation, and interactions
 */

(function() {
  'use strict';

  // Social media icon SVGs
  const socialIcons = {
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    dribbble: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/></svg>',
    behance: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM6.545 9.97c.55 0 .99-.15 1.34-.44.35-.29.52-.75.52-1.38 0-.36-.07-.66-.2-.9-.13-.24-.3-.43-.54-.57-.24-.14-.5-.24-.8-.3-.31-.06-.63-.09-.98-.09H2.97v3.68h3.575zm.19 5.857c.35 0 .69-.04 1.01-.114.32-.078.6-.2.84-.37.24-.17.43-.4.56-.68.13-.28.2-.63.2-1.04 0-.83-.24-1.44-.71-1.82-.47-.38-1.1-.56-1.88-.56H2.97v4.58h3.765zM15.333 16.594c.43.394.99.587 1.69.587.505 0 .95-.12 1.33-.36.384-.24.646-.5.79-.78h2.6c-.42 1.29-1.06 2.2-1.92 2.75-.86.55-1.9.82-3.12.82-.85 0-1.62-.13-2.3-.4-.684-.27-1.27-.66-1.76-1.17-.487-.51-.866-1.12-1.137-1.84-.27-.72-.4-1.52-.4-2.4 0-.85.13-1.64.4-2.35.27-.71.65-1.33 1.14-1.85.49-.52 1.07-.93 1.76-1.22.69-.29 1.45-.44 2.28-.44.93 0 1.74.18 2.44.55.7.37 1.28.87 1.74 1.5.46.63.79 1.36.99 2.19.2.83.27 1.71.2 2.63h-7.7c.05.9.34 1.6.77 2zM18.81 10.92c-.35-.38-.87-.57-1.58-.57-.46 0-.84.08-1.15.24-.3.16-.55.36-.74.6-.19.24-.32.5-.4.77-.08.27-.13.52-.15.74h4.66c-.11-.7-.29-1.4-.64-1.78zM14.77 5.836h5.46V7.3h-5.46V5.836z"/></svg>'
  };

  // Action button icons
  const actionIcons = {
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
  };

  /**
   * Initialize the business card
   */
  function init() {
    if (typeof cardConfig === 'undefined') {
      console.error('Card configuration not found. Please create a config.js file.');
      return;
    }

    applyTheme();
    renderCard();
    setupAnalytics();
  }

  /**
   * Apply theme to the document
   */
  function applyTheme() {
    const theme = cardConfig.theme || 'professional';
    document.documentElement.classList.add(`theme-${theme}`);

    // Apply custom colors if enabled
    if (cardConfig.customColors && cardConfig.customColors.enabled) {
      const root = document.documentElement;
      const colors = cardConfig.customColors;

      if (colors.primary) root.style.setProperty('--color-primary', colors.primary);
      if (colors.secondary) root.style.setProperty('--color-secondary', colors.secondary);
      if (colors.accent) root.style.setProperty('--color-accent', colors.accent);
      if (colors.background) root.style.setProperty('--color-background', colors.background);
      if (colors.text) root.style.setProperty('--color-text', colors.text);
      if (colors.textLight) root.style.setProperty('--color-text-light', colors.textLight);
    }

    // Update meta theme color
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);

    // Update page title and meta
    document.title = `${cardConfig.name} | Digital Business Card`;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', cardConfig.name);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', `${cardConfig.title} at ${cardConfig.company}`);
  }

  /**
   * Render all card sections
   */
  function renderCard() {
    renderHeader();
    renderContactInfo();
    renderActions();
    renderSocialLinks();
    renderFooter();
  }

  /**
   * Render header section
   */
  function renderHeader() {
    const logoContainer = document.getElementById('logoContainer');
    const logo = document.getElementById('logo');
    const avatar = document.getElementById('avatar');
    const name = document.getElementById('name');
    const title = document.getElementById('title');
    const company = document.getElementById('company');
    const tagline = document.getElementById('tagline');

    // Render company logo
    if (cardConfig.logo) {
      logo.src = cardConfig.logo;
      logo.alt = `${cardConfig.company || 'Company'} logo`;
    } else {
      logoContainer.classList.add('hidden');
    }

    if (cardConfig.avatar) {
      avatar.src = cardConfig.avatar;
      avatar.alt = `${cardConfig.name} profile photo`;
    }

    name.textContent = cardConfig.name || '';
    title.textContent = cardConfig.title || '';
    company.textContent = cardConfig.company || '';

    if (cardConfig.tagline) {
      tagline.textContent = cardConfig.tagline;
    } else {
      tagline.style.display = 'none';
    }
  }

  /**
   * Render contact information
   */
  function renderContactInfo() {
    const contact = cardConfig.contact || {};

    // Email
    const emailItem = document.getElementById('emailItem');
    const emailLink = document.getElementById('emailLink');
    if (contact.email) {
      emailLink.href = `mailto:${contact.email}`;
      emailLink.textContent = contact.email;
    } else {
      emailItem.classList.add('hidden');
    }

    // Phone
    const phoneItem = document.getElementById('phoneItem');
    const phoneLink = document.getElementById('phoneLink');
    if (contact.phone) {
      const cleanPhone = contact.phone.replace(/[^\d+]/g, '');
      phoneLink.href = `tel:${cleanPhone}`;
      phoneLink.textContent = contact.phone;
    } else {
      phoneItem.classList.add('hidden');
    }

    // Website
    const websiteItem = document.getElementById('websiteItem');
    const websiteLink = document.getElementById('websiteLink');
    if (contact.website) {
      websiteLink.href = contact.website;
      websiteLink.textContent = contact.website.replace(/^https?:\/\//, '');
    } else {
      websiteItem.classList.add('hidden');
    }

    // Location
    const locationItem = document.getElementById('locationItem');
    const location = document.getElementById('location');
    if (contact.location) {
      location.textContent = contact.location;
    } else {
      locationItem.classList.add('hidden');
    }
  }

  /**
   * Render action buttons
   */
  function renderActions() {
    const actionsContainer = document.getElementById('actions');
    const actions = cardConfig.actions || [];

    actionsContainer.innerHTML = '';

    actions.forEach((action, index) => {
      const button = document.createElement('button');
      button.className = `action-btn${index > 0 ? ' secondary' : ''}`;
      button.innerHTML = `
        ${actionIcons[action.icon] || ''}
        <span>${action.label}</span>
      `;

      button.addEventListener('click', () => handleAction(action));
      actionsContainer.appendChild(button);
    });
  }

  /**
   * Handle action button clicks
   */
  function handleAction(action) {
    switch (action.type) {
      case 'vcard':
        downloadVCard();
        break;
      case 'email':
        window.location.href = `mailto:${cardConfig.contact.email}`;
        break;
      case 'phone':
        window.location.href = `tel:${cardConfig.contact.phone.replace(/[^\d+]/g, '')}`;
        break;
      case 'website':
        window.open(cardConfig.contact.website, '_blank', 'noopener');
        break;
      case 'sms':
        window.location.href = `sms:${cardConfig.contact.phone.replace(/[^\d+]/g, '')}`;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${cardConfig.contact.phone.replace(/[^\d+]/g, '')}`, '_blank');
        break;
      case 'share':
        shareCard();
        break;
      case 'custom':
        if (action.url) window.open(action.url, '_blank', 'noopener');
        break;
      default:
        console.warn('Unknown action type:', action.type);
    }
  }

  /**
   * Generate and download vCard
   */
  function downloadVCard() {
    const vcard = cardConfig.vcard || {};
    const contact = cardConfig.contact || {};

    const vcardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${vcard.lastName || ''};${vcard.firstName || ''};;;`,
      `FN:${cardConfig.name || ''}`,
      `ORG:${vcard.organization || cardConfig.company || ''}`,
      `TITLE:${vcard.title || cardConfig.title || ''}`,
      `EMAIL;TYPE=WORK:${vcard.email || contact.email || ''}`,
      `TEL;TYPE=CELL:${vcard.phone || contact.phone || ''}`,
      `URL:${vcard.website || contact.website || ''}`
    ];

    // Add address if available
    if (vcard.address) {
      const addr = vcard.address;
      vcardData.push(`ADR;TYPE=WORK:;;${addr.street || ''};${addr.city || ''};${addr.state || ''};${addr.zip || ''};${addr.country || ''}`);
    }

    // Add social profiles
    if (cardConfig.social) {
      if (cardConfig.social.linkedin) {
        vcardData.push(`X-SOCIALPROFILE;TYPE=linkedin:${cardConfig.social.linkedin}`);
      }
      if (cardConfig.social.twitter) {
        vcardData.push(`X-SOCIALPROFILE;TYPE=twitter:${cardConfig.social.twitter}`);
      }
    }

    // Add note
    if (vcard.note) {
      vcardData.push(`NOTE:${vcard.note}`);
    }

    vcardData.push('END:VCARD');

    const blob = new Blob([vcardData.join('\n')], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cardConfig.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Contact saved!');
  }

  /**
   * Share the card using Web Share API
   */
  async function shareCard() {
    const shareData = {
      title: cardConfig.name,
      text: `${cardConfig.title} at ${cardConfig.company}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  }

  /**
   * Render social media links
   */
  function renderSocialLinks() {
    const container = document.getElementById('socialLinks');
    const social = cardConfig.social || {};

    container.innerHTML = '';

    const platforms = ['linkedin', 'twitter', 'instagram', 'facebook', 'github', 'youtube', 'tiktok', 'dribbble', 'behance'];

    platforms.forEach(platform => {
      if (social[platform]) {
        const link = document.createElement('a');
        link.href = social[platform];
        link.className = 'social-link';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', platform);
        link.innerHTML = socialIcons[platform] || '';
        container.appendChild(link);
      }
    });

    // Hide section if no social links
    if (container.children.length === 0) {
      container.style.display = 'none';
    }
  }

  /**
   * Render footer
   */
  function renderFooter() {
    const footer = document.getElementById('footer');
    const footerText = document.getElementById('footerText');
    const config = cardConfig.footer || {};

    if (config.customText) {
      footerText.textContent = config.customText;
    } else if (config.showPoweredBy !== false) {
      footerText.innerHTML = 'Powered by <a href="#">Digital Business Cards</a>';
    } else {
      footer.style.display = 'none';
    }
  }

  /**
   * Show toast notification
   */
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  /**
   * Setup analytics if enabled
   */
  function setupAnalytics() {
    if (cardConfig.analytics && cardConfig.analytics.enabled && cardConfig.analytics.googleAnalyticsId) {
      // Load Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${cardConfig.analytics.googleAnalyticsId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', cardConfig.analytics.googleAnalyticsId);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
