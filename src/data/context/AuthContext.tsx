import {createContext, useEffect, useState} from 'react'
import {auth} from '../../firebase/config'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import Cookies from 'js-cookie'
// npm i --save-dev @types/js-cookie
import route from 'next/router'

import User from '@/model/User'

interface AuthContextProps {
    user?: User,
    loading?: boolean,
    loginGoogle?: () => Promise<void>,
    login?: (email: string, password: string) => Promise<void>,
    register?: (email: string, password: string) => Promise<void>,
    logout?: (photoURL) => Promise<void>
}

interface AuthProviderProps {
    children?: any
}

const AuthContext = createContext<AuthContextProps>({})

async function normalUser(firebaseUser): Promise<User> {
    const token = await firebaseUser.getIdToken()
    return {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        token,
        provider: firebaseUser.providerData[0].providerId,
        imageUrl: firebaseUser.photoURL
    }
}

function manageCookie(loggedIn: boolean) {
    if(loggedIn) {
        Cookies.set('tailform-auth', loggedIn, {
            expires: 7
        })
    } else {
        Cookies.remove('tailform-auth')
    }
}

export function AuthProvider(props: AuthProviderProps) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>(null)

    async function configSession(firebaseUser) {
        if(firebaseUser?.email) {
            const user = await normalUser(firebaseUser)
            setUser(user)
            manageCookie(true)
            setLoading(false)
            return user.email
        } else {
            setUser(null)
            manageCookie(false)
            setLoading(false)
            return false
        }
    }

    async function loginGoogle() {
        try {
            setLoading(true)
            auth
            const resp = await signInWithPopup(auth, new GoogleAuthProvider())
            await configSession(resp.user)
            route.push('/Profile')
            
        } finally {
            setLoading(false)
        }
    }
    
    async function login(email, password) {
        try {
            setLoading(true)
            const resp = await signInWithEmailAndPassword(auth, email, password)
            await configSession(resp.user)
            route.push('/Profile')
        } finally {
            setLoading(false)
        }
    }
    
    async function register(email, password) {
        try {
            setLoading(true)
            const resp = await createUserWithEmailAndPassword(auth, email, password)
            await configSession(resp.user)
            route.push('/Profile')
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await signOut(auth)
            await configSession(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(Cookies.get('tailform-auth')) {
            const cancel = auth.onIdTokenChanged(configSession)
            return () => cancel()
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            loginGoogle,
            login,
            register,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext