
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/authOptions'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="p-10">
      <h1 className="text-2xl">Welcome, {session.user?.email}</h1>
      <p>You are logged in.</p>
    </div>
  )
}
