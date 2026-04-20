import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren
} from 'react'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'

import { auth } from '@/lib/firebase/client'

type AuthContextValue = {
  ready: boolean
  signOut: () => Promise<void>
  user: User | null
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(auth.currentUser)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setReady(true)
    })
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      ready,
      signOut: () => signOut(auth),
      user
    }),
    [ready, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthSession() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthSession must be used within an AuthProvider.')
  }

  return context
}
