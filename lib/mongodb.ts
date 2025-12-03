import { MongoClient } from 'mongodb'

const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient }

function getMongoUri() {
  // Prefer explicit production URI if set (e.g., in Vercel env vars)
  if (process.env.MONGODB_URI_PROD && (process.env.VERCEL === '1' || process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production')) {
    return process.env.MONGODB_URI_PROD
  }

  // Fallback to local/dev URI
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI

  // Last-resort: check older variable names
  if (process.env.MONGODB_URI_LOCAL) return process.env.MONGODB_URI_LOCAL

  return undefined
}

export async function getMongoClient() {
  const uri = getMongoUri()
  if (!uri) throw new Error('MONGODB_URI not configured. Set MONGODB_URI (local) and MONGODB_URI_PROD (production).')

  if (globalForMongo._mongoClient) return globalForMongo._mongoClient

  const client = new MongoClient(uri)
  await client.connect()
  globalForMongo._mongoClient = client
  return client
}

export async function getPostsCollection() {
  const client = await getMongoClient()
  const dbName = process.env.MONGODB_DB || 'rahulwebdev'
  return client.db(dbName).collection('posts')
}
