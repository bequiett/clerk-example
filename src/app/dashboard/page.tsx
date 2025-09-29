import { auth, currentUser, User } from '@clerk/nextjs/server'
import Image from "next/image"
 
function isTwoFactorEnabled(user: User | null) {
  return (
    !user?.twoFactorEnabled ? (
      <p className='text-sm text-gray-400 text-center'>
        Two-Factor Authentication is not enabled!<br />
        We recommend enabling it for added security.
      </p>
    ) : (
      <p className='text-sm text-gray-400 text-center'>
        Two-Factor Authentication is enabled in your account!
      </p>
    )
  )
}

export default async function DashboardServerPage() {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) {
    return <div>Sign in to view this page</div>
  }

  const user = await currentUser()
  const userProfile = user?.imageUrl
  const registeredDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'

  return (
    <div className='grid place-items-center flex flex-col gap-4'>
      <Image
        className="rounded-full"
        src={userProfile || ''}
        alt="Profile Image"
        width={100}
        height={100}
      />
      <h1>Welcome, {user?.firstName} to server-side dashboard!</h1>
      <p>
        Registered Email: { user?.primaryEmailAddress?.emailAddress }<br />
        Registered Date: { registeredDate }</p>
      { isTwoFactorEnabled(user) }
    </div>
  )
}