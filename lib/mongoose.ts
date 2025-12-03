import mongoose from 'mongoose'

const globalWithMongoose = global as unknown as { _mongoose?: { conn: typeof mongoose | null; promise?: Promise<typeof mongoose> } }

function getMongoUri() {
  if (process.env.MONGODB_URI_PROD && (process.env.VERCEL === '1' || process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production')) {
    return process.env.MONGODB_URI_PROD
  }
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI
  if (process.env.MONGODB_URI_LOCAL) return process.env.MONGODB_URI_LOCAL
  return undefined
}

export async function connectMongoose() {
  const uri = getMongoUri()
  if (!uri) throw new Error('MONGODB_URI not configured. Set MONGODB_URI (local) and MONGODB_URI_PROD (production).')

  if (globalWithMongoose._mongoose?.conn) return globalWithMongoose._mongoose.conn

  if (!globalWithMongoose._mongoose) globalWithMongoose._mongoose = { conn: null, promise: undefined }

  if (!globalWithMongoose._mongoose.promise) {
    globalWithMongoose._mongoose.promise = mongoose
      .connect(uri, {
        // recommended options
        // useNewUrlParser and useUnifiedTopology are defaults in modern mongoose
        bufferCommands: false,
      })
      .then((m) => m)
  }

  globalWithMongoose._mongoose.conn = await globalWithMongoose._mongoose.promise
  return globalWithMongoose._mongoose.conn
}

export default connectMongoose
