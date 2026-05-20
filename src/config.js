// ─────────────────────────────────────────────
// EmailJS Configuration
// 1. Sign up free at https://www.emailjs.com
// 2. Create a service (Gmail works fine)
// 3. Create an email template
// 4. Replace the placeholders below
// ─────────────────────────────────────────────

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',       // e.g. 'service_abc123'
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',     // e.g. 'template_xyz789'
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',       // e.g. 'abc123XYZ'
};

// Your details
export const USERS = {
  emilie: {
    name: 'Emilie',
    email: 'EMILIE_EMAIL@example.com',
    photo: '/emilie.jpg',              // Drop emilie.jpg in /public folder
  },
  julie: {
    name: 'Julie',
    email: 'JULIE_EMAIL@example.com',
    photo: '/julie.jpg',               // Drop julie.jpg in /public folder
  },
};

// Which user is this instance of the app?
// Change to 'julie' on Julie's phone
export const CURRENT_USER = 'emilie';
export const OTHER_USER = 'julie';
