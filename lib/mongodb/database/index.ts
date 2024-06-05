import mongoose from 'mongoose'
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDB = async () => {
    if(cached.conn) return cached.conn;
    if(!MONGODB_URI) throw new Error('URI missing!!!');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'hackpulse',
        bufferCommands: false
    });
    cached.conn = await cached.promise;
    return cached.conn;
}