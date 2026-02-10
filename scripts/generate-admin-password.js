/**
 * Generate hashed password for CoreConnect admin
 * Usage: node scripts/generate-admin-password.js "YourPassword"
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'CoreConnect2024!';

bcrypt.hash(password, 10).then(hash => {
  console.log('\n=== CoreConnect Admin Password ===');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nAdd this to your .env.local:');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  console.log('\n');
}).catch(err => {
  console.error('Error generating hash:', err);
  process.exit(1);
});

