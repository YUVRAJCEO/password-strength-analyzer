// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import bcrypt from 'bcryptjs'

// let users: any[] = []  // temporary in-memory user store

// const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         const user = users.find(u => u.email === credentials?.email)
//         if (user && await bcrypt.compare(credentials!.password, user.password)) {
//           return { id: '1', name: user.email, email: user.email }
//         }
//         return null
//       }
//     })
//   ],
//   pages: {
//     signIn: '/login'
//   },
//   session: {
//     strategy: 'jwt'
//   }
// }

// export default NextAuth(authOptions)  // ✅ this fixes your error



import NextAuth from 'next-auth'
import { authOptions } from '../../../lib/authOptions'

export default NextAuth(authOptions)
