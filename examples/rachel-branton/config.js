/**
 * Business Card Configuration
 * Client: Rachel Branton
 * Theme: Elegant
 */
const cardConfig = {
  name: "Rachel Branton",
  title: "Creative Director",
  company: "Artistry Studios",
  tagline: "Transforming ideas into visual stories",

  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",

  theme: "elegant",

  customColors: {
    enabled: false,
    primary: "#b8860b",
    secondary: "#996515"
  },

  contact: {
    email: "rachel@artistrystudios.com",
    phone: "+1 (415) 555-0123",
    website: "https://rachelbranton.design",
    location: "San Francisco, CA"
  },

  social: {
    linkedin: "https://linkedin.com/in/rachelbranton",
    twitter: "https://twitter.com/rachelbranton",
    instagram: "https://instagram.com/rachelbranton.design",
    facebook: "",
    github: "",
    youtube: "",
    dribbble: "https://dribbble.com/rachelbranton",
    behance: "https://behance.net/rachelbranton"
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
      label: "View Portfolio",
      type: "website",
      icon: "globe"
    }
  ],

  vcard: {
    firstName: "Rachel",
    lastName: "Branton",
    organization: "Artistry Studios",
    title: "Creative Director",
    email: "rachel@artistrystudios.com",
    phone: "+14155550123",
    website: "https://rachelbranton.design",
    address: {
      street: "",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "USA"
    },
    note: "Creative Director - Met via digital business card"
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
