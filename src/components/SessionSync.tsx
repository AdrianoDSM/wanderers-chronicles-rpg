'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useUserStore } from '@/store/useUserStore'

export default function SessionSync() {
  const { data: session } = useSession()
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name ?? '',
        email: session.user.email ?? '',
      })
    } else {
      setUser(null)
    }
  }, [session, setUser])

  return null
}
