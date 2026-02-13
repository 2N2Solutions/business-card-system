/**
 * Business Card Configuration Template
 * Copy this file to config.js and customize for each client
 */
const cardConfig = {
  // Personal Information
  name: "Your Name",
  title: "Your Title",
  company: "Company Name",
  tagline: "Your professional tagline or motto",

  // Profile Image
  avatar: "../assets/images/default-avatar.svg",

  // Theme Selection: 'professional', 'modern', 'minimal', 'bold', 'elegant'
  theme: "professional",

  // Custom Colors (optional - overrides theme)
  customColors: {
    enabled: false,
    primary: "#2563eb",
    secondary: "#1e40af",
    accent: "#3b82f6",
    background: "#ffffff",
    text: "#1f2937",
    textLight: "#6b7280"
  },

  // Contact Information
  contact: {
    email: "email@example.com",
    phone: "+1 (555) 123-4567",
    website: "https://yourwebsite.com",
    location: "City, State"
  },

  // Social Media Links (leave empty string to hide)
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
    facebook: "",
    github: "",
    youtube: "",
    tiktok: "",
    dribbble: "",
    behance: ""
  },

  // Call-to-Action Buttons
  actions: [
    {
      label: "Save Contact",
      type: "vcard",
      icon: "download"
    },
    {
      label: "Send Email",
      type: "email",
      icon: "mail"
    },
    {
      label: "Call Now",
      type: "phone",
      icon: "phone"
    },
    {
      label: "Visit Website",
      type: "website",
      icon: "globe"
    }
  ],

  // vCard Data for Contact Download
  vcard: {
    firstName: "Your",
    lastName: "Name",
    organization: "Company Name",
    title: "Your Title",
    email: "email@example.com",
    phone: "+15551234567",
    website: "https://yourwebsite.com",
    address: {
      street: "",
      city: "City",
      state: "State",
      zip: "",
      country: "USA"
    },
    note: "Met via digital business card"
  },

  // Analytics (optional)
  analytics: {
    enabled: false,
    googleAnalyticsId: ""
  },

  // Footer
  footer: {
    showPoweredBy: true,
    customText: ""
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = cardConfig;
}
