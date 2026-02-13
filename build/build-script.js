#!/usr/bin/env node

/**
 * Digital Business Card - Build Script
 * Creates deployable client folders from configuration
 */

const fs = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.join(__dirname, '..', 'template');
const CLIENTS_DIR = path.join(__dirname, '..', 'clients');
const ASSETS_DIR = path.join(__dirname, '..', 'assets');

/**
 * Main build function
 */
async function build() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  if (args.includes('--client')) {
    const clientIndex = args.indexOf('--client');
    const clientName = args[clientIndex + 1];

    if (!clientName) {
      console.error('Error: Please provide a client name after --client');
      process.exit(1);
    }

    await buildClient(clientName);
  } else if (args.includes('--all')) {
    await buildAllClients();
  } else {
    await interactiveMode();
  }
}

/**
 * Show help information
 */
function showHelp() {
  console.log(`
Digital Business Card - Build Script

Usage:
  node build-script.js [options]

Options:
  --client <name>    Build a specific client folder
  --all              Build all clients in the clients/ directory
  --help, -h         Show this help message

Examples:
  node build-script.js --client john-smith
  node build-script.js --all

Interactive Mode:
  Run without arguments to enter interactive mode where you can
  create a new client configuration step by step.
`);
}

/**
 * Build a specific client
 */
async function buildClient(clientName) {
  const clientDir = path.join(CLIENTS_DIR, clientName);
  const configPath = path.join(clientDir, 'config.js');

  if (!fs.existsSync(configPath)) {
    console.error(`Error: Config file not found at ${configPath}`);
    console.log('Create a config.js file in the client folder first.');
    process.exit(1);
  }

  console.log(`Building client: ${clientName}`);

  // Copy template files
  copyFile(
    path.join(TEMPLATE_DIR, 'index.html'),
    path.join(clientDir, 'index.html')
  );

  copyFile(
    path.join(TEMPLATE_DIR, 'style.css'),
    path.join(clientDir, 'style.css')
  );

  copyFile(
    path.join(TEMPLATE_DIR, 'script.js'),
    path.join(clientDir, 'script.js')
  );

  // Copy assets if they don't exist
  const clientAssetsDir = path.join(clientDir, 'assets');
  if (!fs.existsSync(clientAssetsDir)) {
    copyDirectory(ASSETS_DIR, clientAssetsDir);
  }

  // Update paths in HTML
  updateHtmlPaths(clientDir);

  console.log(`Client ${clientName} built successfully!`);
  console.log(`Output: ${clientDir}`);
}

/**
 * Build all clients
 */
async function buildAllClients() {
  if (!fs.existsSync(CLIENTS_DIR)) {
    console.error('Error: clients/ directory not found');
    process.exit(1);
  }

  const clients = fs.readdirSync(CLIENTS_DIR)
    .filter(name => {
      const clientPath = path.join(CLIENTS_DIR, name);
      return fs.statSync(clientPath).isDirectory() &&
             fs.existsSync(path.join(clientPath, 'config.js'));
    });

  if (clients.length === 0) {
    console.log('No clients found with config.js files.');
    return;
  }

  console.log(`Building ${clients.length} client(s)...`);

  for (const client of clients) {
    await buildClient(client);
    console.log('');
  }

  console.log('All clients built successfully!');
}

/**
 * Interactive mode for creating new clients
 */
async function interactiveMode() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

  console.log('\n=== Digital Business Card Builder ===\n');

  try {
    // Get client info
    const name = await question('Full Name: ');
    const title = await question('Job Title: ');
    const company = await question('Company: ');
    const email = await question('Email: ');
    const phone = await question('Phone (optional): ');
    const website = await question('Website (optional): ');

    console.log('\nThemes: professional, modern, minimal, bold, elegant');
    const theme = await question('Theme (default: professional): ') || 'professional';

    // Generate folder name
    const folderName = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const clientDir = path.join(CLIENTS_DIR, folderName);

    // Create directory
    if (!fs.existsSync(clientDir)) {
      fs.mkdirSync(clientDir, { recursive: true });
    }

    // Generate config
    const config = generateConfig({
      name,
      title,
      company,
      email,
      phone,
      website,
      theme
    });

    // Write config
    fs.writeFileSync(
      path.join(clientDir, 'config.js'),
      config,
      'utf8'
    );

    // Build the client
    await buildClient(folderName);

    console.log(`\nClient "${folderName}" created successfully!`);
    console.log(`Location: ${clientDir}`);
    console.log('\nTo preview, open index.html in a browser or run:');
    console.log(`  npx serve ${clientDir}`);

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    rl.close();
  }
}

/**
 * Generate config file content
 */
function generateConfig(data) {
  const nameParts = data.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  const config = {
    name: data.name,
    title: data.title,
    company: data.company,
    tagline: '',
    avatar: 'assets/images/default-avatar.png',
    theme: data.theme,
    customColors: {
      enabled: false,
      primary: '#2563eb',
      secondary: '#1e40af'
    },
    contact: {
      email: data.email,
      phone: data.phone || '',
      website: data.website || '',
      location: ''
    },
    social: {
      linkedin: '',
      twitter: '',
      instagram: '',
      facebook: '',
      github: '',
      youtube: ''
    },
    actions: [
      { label: 'Save Contact', type: 'vcard', icon: 'download' },
      { label: 'Send Email', type: 'email', icon: 'mail' }
    ],
    vcard: {
      firstName,
      lastName,
      organization: data.company,
      title: data.title,
      email: data.email,
      phone: (data.phone || '').replace(/[^\d+]/g, ''),
      website: data.website || ''
    },
    footer: {
      showPoweredBy: true
    }
  };

  if (data.phone) {
    config.actions.push({ label: 'Call Now', type: 'phone', icon: 'phone' });
  }
  if (data.website) {
    config.actions.push({ label: 'Visit Website', type: 'website', icon: 'globe' });
  }

  return `/**
 * Business Card Configuration
 * Client: ${data.name}
 * Generated: ${new Date().toISOString()}
 */
const cardConfig = ${JSON.stringify(config, null, 2)};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = cardConfig;
}
`;
}

/**
 * Copy a file
 */
function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
}

/**
 * Copy a directory recursively
 */
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

/**
 * Update HTML paths to be relative
 */
function updateHtmlPaths(clientDir) {
  const htmlPath = path.join(clientDir, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Update paths from template paths to local paths
  html = html.replace(/\.\.\/assets\//g, 'assets/');

  fs.writeFileSync(htmlPath, html, 'utf8');
}

// Run
build().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
