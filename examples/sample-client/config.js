/**
 * Business Card Configuration
 * Client: Alex Chen
 * Theme: Modern
 */
const cardConfig = {
  name: "Alex Chen",
  title: "Full Stack Developer",
  company: "TechForward Inc",
  tagline: "Building the web, one line at a time",

  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",

  theme: "modern",

  customColors: {
    enabled: false,
    primary: "#8b5cf6",
    secondary: "#7c3aed"
  },

  contact: {
    email: "alex@techforward.io",
    phone: "+1 (555) 987-6543",
    website: "https://alexchen.dev",
    location: "Austin, TX"
  },

  social: {
    linkedin: "https://linkedin.com/in/alexchendev",
    twitter: "https://twitter.com/alexchendev",
    instagram: "",
    facebook: "",
    github: "https://github.com/alexchendev",
    youtube: "https://youtube.com/@alexchendev",
    dribbble: "",
    behance: ""
  },

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

  vcard: {
    firstName: "Alex",
    lastName: "Chen",
    organization: "TechForward Inc",
    title: "Full Stack Developer",
    email: "alex@techforward.io",
    phone: "+15559876543",
    website: "https://alexchen.dev",
    address: {
      street: "",
      city: "Austin",
      state: "TX",
      zip: "",
      country: "USA"
    },
    note: "Full Stack Developer - Met via digital business card"
  },

  analytics: {
    enabled: false,
    googleAnalyticsId: ""
  },

  footer: {
    showPoweredBy: true,
    customText: ""
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = cardConfig;
}
