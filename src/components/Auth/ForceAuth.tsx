import Head from 'next/head'
import router from 'next/router'

import useAuth from '@/data/hook/useAuth'

interface ForceAuthProps {
    children?: any
}

export default function ForceAuth(props: ForceAuthProps) {
    const {user, loading} = useAuth()

    function renderContent() {
        return (
            <>
                <Head>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            if(!document.cookie?.includes("tailform-auth")) {
                                window.location.href = "/Authentication"
                            }  
                        `
                    }} />
                </Head>
                {props.children}
            </>
        )
    }

    function renderLoading() {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <p className="text-sky-500 text-3xl text-center font-bold">
                    Loading..
                </p>
            </div>
        )
    }

    if(!loading && user?.email) {
        return renderContent()
    } else if(loading) {
        return renderLoading()
    } else {
        router.push('/Authentication')
        return null
    }
}