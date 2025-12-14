import { config } from 'dotenv'
config({ path: '.env.local' })

import { connectDB } from '../lib/mongodb'

async function main() {
  try {
    const mongoose = await connectDB()
    const admin = mongoose.connection.db!.admin()
    const info = await admin.serverStatus()
    console.log('Connected to MongoDB. Server info:')
    console.log(JSON.stringify({ version: info.version, process: info.process }, null, 2))
    process.exit(0)
  } catch (err: any) {
    console.error('Failed to connect to MongoDB:', err.message || err)
    process.exit(1)
  }
}

main()
