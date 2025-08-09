const crypto = require('crypto');

// 32-byte (256-bit) key — must be securely stored per user
// You can pass this as a parameter per user instead of hardcoding it
function encrypt(text, key) {
  const iv = crypto.randomBytes(16); // generate random IV for each encryption
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(cipherText, key) {
  const parts = cipherText.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Example Usage
// const key = crypto.randomBytes(32).toString('hex'); // Generate per user on registration
// const encrypted = encrypt('my password', key);
// const decrypted = decrypt(encrypted, key);

module.exports = { encrypt, decrypt };
