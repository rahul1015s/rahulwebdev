import { config } from 'dotenv'
config({ path: '.env.local' })

import { connectDB } from '../lib/mongodb'

async function makeUserAdmin() {
  const email = process.argv[2]

  if (!email) {
    console.log('Usage: npm run make-admin <email>')
    console.log('This will make an existing user an admin')
    process.exit(1)
  }

  try {
    const mongooseConnection = await connectDB()
    const db = mongooseConnection.connection.db!

    const result = await db.collection('users').updateOne(
      { email },
      { $set: { role: 'admin' } }
    )

    if (result.matchedCount === 0) {
      console.log('User not found')
    } else {
      console.log('User made admin successfully')
    }
  } catch (error) {
    console.error('Error making user admin:', error)
  }
}

makeUserAdmin()