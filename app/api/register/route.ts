import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs' // or 'bcrypt' if it works in your setup

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const client = new MongoClient(uri)
const dbName = process.env.MONGODB_DB || 'netsec_project'

export async function POST(req: Request): Promise<Response> {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required.' }, { status: 400 })
    }

    await client.connect()
    const db = client.db(dbName)
    const users = db.collection('users')

    const existing = await users.findOne({ email })
    if (existing) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 409 })
    }

    const hash = await bcrypt.hash(password, 10)
    await users.insertOne({ email, password: hash })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Registration error:', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  } finally {
    await client.close()
  }
}
