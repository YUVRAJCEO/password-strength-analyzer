import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from './db'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        // Fetch user from DB
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [credentials.email])
        const user = (rows as any[])[0]
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, name: user.email, email: user.email }
        }
        return null
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' }
}
