'use client'
import { useUser } from '@clerk/nextjs'
import type { UserResource } from '@clerk/types'
import Image from 'next/image'
 
function isTwoFactorEnabled(user: UserResource | null) {
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

export default function DashboardClientPage() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>
  }

  const registeredDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'

  return (
    <div className='grid place-items-center flex flex-col gap-4'>
      <Image
        className="rounded-full"
        src={user?.imageUrl ?? ""}
        alt="Profile Image"
        width={100}
        height={100}
      />
      <h1>Welcome, {user?.firstName}!</h1>
      <p>
        Registered Email: { user?.primaryEmailAddress?.emailAddress }<br />
        Registered Date: { registeredDate }</p>
      { isTwoFactorEnabled(user) }
    </div>
  )
}