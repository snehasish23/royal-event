import bcrypt from 'bcryptjs'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('='.repeat(60))
console.log('Royal STAR Event Management - Admin Password Hash Generator')
console.log('='.repeat(60))
console.log('')

rl.question('Enter admin email: ', (email) => {
  rl.question('Enter admin name: ', (name) => {
    rl.question('Enter password (min 6 characters): ', async (password) => {
      
      if (password.length < 6) {
        console.log('\n❌ Password must be at least 6 characters!')
        rl.close()
        return
      }

      console.log('\n⏳ Generating password hash...\n')
      
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      
      console.log('✅ Password hash generated successfully!\n')
      console.log('='.repeat(60))
      console.log('Copy and paste this SQL into Supabase SQL Editor:')
      console.log('='.repeat(60))
      console.log('')
      console.log(`INSERT INTO admins (email, password_hash, name, created_at, updated_at)`)
      console.log(`VALUES (`)
      console.log(`  '${email}',`)
      console.log(`  '${hash}',`)
      console.log(`  '${name}',`)
      console.log(`  NOW(),`)
      console.log(`  NOW()`)
      console.log(`);`)
      console.log('')
      console.log('='.repeat(60))
      console.log('Login Credentials:')
      console.log('='.repeat(60))
      console.log(`Email: ${email}`)
      console.log(`Password: ${password}`)
      console.log('')
      console.log('⚠️  Save these credentials securely!')
      console.log('')
      
      rl.close()
    })
  })
})
