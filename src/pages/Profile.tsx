import Head from 'next/head'
import useAuth from '@/data/hook/useAuth'
import ForceAuth from '@/components/Auth/ForceAuth'

import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'

import UserIcon from '../icons/user.svg'
import { LoginIcon } from '@/icons'

export default function Profile() {
    const {user, logout} = useAuth()

    return (
        <ForceAuth>
            <Head>
                <link rel="shortcut icon" href="/tailwindcss.png" type="image/x-icon" />
                <title>Tailform - Profile</title>
            </Head>

            <main className="
            relative
            h-screen w-screen bg-gray-200
            flex flex-col items-center ">
                <Header />
                <section className="
                    bg-gray-50 p-8 mt-20
                    md:w-1/2 md:h-1/2
                    lg:w-1/4 lg:h-1/2
                    flex flex-col gap-6 items-center justify-center
                    rounded-md shadow-card">
                    <h1 className="text-3xl text-sky-500 text-center font-bold">
                        Profile
                    </h1>

                    <Image
                    src={user?.imageUrl ?? UserIcon}
                    alt="Foto de perfil"
                    width={150} height={150}
                    className="rounded-full bg-gray-200" />

                    <h3
                    className="text-2xl text-gray-700 text-center font-medium">
                        {user?.name ?? user?.email}
                    </h3>
                </section>

                <Link 
                href="/Authentication"
                onClick={logout}
                className="
                    absolute bottom-4 left-4
                    text-gray-700 text-lg font-medium
                    flex gap-2 items-center p-2
                    rounded-md
                    transition-colors
                    hover:bg-gray-50
                    hover:shadow-button
                    focus:outline-gray-800
                    focus:bg-gray-50
                    focus:shadow-button" >
                    {LoginIcon}
                    Logout
                </Link>
            </main>
        </ForceAuth>
    )
}