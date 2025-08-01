import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { db } from '../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' })

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    // Check if user already exists
    const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email])
    if ((rows as any[]).length > 0) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Insert new user
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword])
    res.status(200).json({ message: 'User registered' })
  } catch (err) {
    res.status(500).json({ error: 'Database error' })


}  }  