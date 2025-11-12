-- Create Initial Admin User
-- Run this SQL in Supabase SQL Editor to create the first admin account

-- IMPORTANT: Replace the email, password hash, and name below with your actual values
-- To generate a bcrypt hash for your password, use an online bcrypt generator or Node.js:
-- node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPasswordHere', 10).then(hash => console.log(hash));"

-- Example admin creation (replace with your actual data):
INSERT INTO admins (email, password_hash, name, created_at, updated_at)
VALUES 
  ('admin@royalstar.in', '$2a$10$YourBcryptHashHere', 'Admin User', NOW(), NOW());

-- After creating the admin, you can login with:
-- Email: admin@royalstar.in
-- Password: (the password you hashed above)

-- To create additional admins later, use the admin panel after logging in.

-- Password hash generator example (copy and run in Node.js):
-- const bcrypt = require('bcryptjs');
-- const password = 'admin123'; // Your desired password
-- bcrypt.hash(password, 10).then(hash => console.log('Hash:', hash));
