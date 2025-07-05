// src/lib/mongodb.ts
import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

console.log("✅ MONGODB_URI =", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable inside .env.local");
}

interface MongooseGlobalCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Use globalThis to persist the cache across hot reloads
const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose: MongooseGlobalCache;
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

export const connectMongo = async (): Promise<Connection> => {
  if (globalWithMongoose.mongoose.conn) {
    return globalWithMongoose.mongoose.conn;
  }

  if (!globalWithMongoose.mongoose.promise) {
    globalWithMongoose.mongoose.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => mongooseInstance.connection);
  }

  globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
  return globalWithMongoose.mongoose.conn;
};
