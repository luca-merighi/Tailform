import React, { useState } from 'react'
import Head from 'next/head'

import useAuth from '@/data/hook/useAuth'

import Header from '@/components/Header'
import AuthInput from '@/components/Auth/AuthInput'

import { LoginIcon, GoogleIcon } from '@/icons'

export default function Authentication() {
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState(null)

    const {login, register, loginGoogle} = useAuth()

    function showErrorMessage(msg: any, time = 5) {
        setAuthError(msg)
        setTimeout(() => setAuthError(null), time * 1000)
    }

    async function submit() {
        try {
            if(authMode === 'login') {
                await login(email, password)      
            } else {
                await register(email, password)      
            }
        } catch (error) {
            showErrorMessage('Ocorreu um erro!')
        }
    }

    return (
        <React.Fragment>
            <Head>
                <link rel="shortcut icon" href="/tailwindcss.png" type="image/x-icon" />
                <title>Tailform - Login</title>
            </Head>

            <main className="
                bg-gray-200 h-screen w-screen
                flex">
                <figure className="
                    hidden md:block md:w-1/2 lg:w-2/3 bg-gray-100">
                    <img 
                    src="https://source.unsplash.com/random" 
                    alt=""
                    className="h-screen w-full object-cover" />
                </figure>
                <section className="
                    w-full md:w-1/2 lg:w-1/3">
                    <Header />

                    <div className="
                        p-8 w-full
                        flex flex-col gap-6">
                        <h3 className="text-3xl text-gray-800 font-bold">
                            {authMode === 'login'
                            ? 'Entre com sua conta'
                            : 'Cadastre-se na plataforma'}
                        </h3>

                        {authError ? (
                            <div className="
                                w-fit bg-red-50 p-2
                                border-2 border-red-500 rounded-md">
                                <p className="
                                    text-red-400 font-semibold">
                                    {authError}
                                </p>
                            </div>
                        ) : false}

                        <AuthInput
                            label="Email"
                            type="email"
                            placeholder="Digite seu E-mail"
                            mandatory
                            value={email}
                            changeValue={setEmail} />

                        {authMode === 'register' ? (
                            <AuthInput
                                label="Nome"
                                type="text"
                                placeholder="Digite seu Nome"
                                mandatory
                                value={name}
                                changeValue={setName} />
                            ) : false}

                        <AuthInput
                            label="Senha"
                            type="password"
                            placeholder="Digite sua Senha"
                            mandatory
                            value={password}
                            changeValue={setPassword} />

                        <button 
                            onClick={submit}
                            className="
                            bg-sky-500 p-4
                            text-gray-100 text-xl font-medium
                            flex gap-2 items-center justify-center
                            border-2 border-sky-500
                            rounded-md shadow-button
                            transition-all
                            hover:scale-x-95
                            hover:bg-gray-50
                            hover:text-sky-500
                            focus:outline-none
                            focus:scale-x-95
                            focus:bg-gray-50
                            focus:text-sky-500">
                            {LoginIcon}
                            {authMode === 'login'
                            ? 'Login'
                            : 'Cadastrar'}
                        </button>

                        <div className="flex gap-2 items-center justify-center">
                            <div className="h-bar w-full bg-gray-700/25" />
                            <span className="text-gray-700 text-xl">
                                ou
                            </span>
                            <div className="h-bar w-full bg-gray-700/25" />
                        </div>

                        <button 
                            onClick={loginGoogle}
                            className="
                            bg-red-500 p-4
                            text-gray-100 text-xl font-medium
                            flex gap-2 items-center justify-center
                            border-2 border-red-500
                            rounded-md shadow-button
                            transition-all
                            hover:scale-x-95
                            hover:bg-gray-50
                            hover:text-red-500
                            focus:outline-none
                            focus:scale-x-95
                            focus:bg-gray-50
                            focus:text-red-500">
                            {GoogleIcon}
                            Entre com o Google
                        </button>

                        {authMode === 'login' ? (
                            <p 
                            onClick={() => setAuthMode('register')}
                            className="text-gray-700 text-lg font-medium">
                                Novo por aqui? &nbsp;
                                <a 
                                className="
                                text-sky-500
                                cursor-pointer
                                hover:text-sky-600">
                                    Crie sua conta gratuitamente!
                                </a>
                            </p>
                        ) : (
                            <p 
                            onClick={() => setAuthMode('login')}
                            className="text-gray-700 text-lg font-medium">
                                Já possuí uma conta? &nbsp;
                                <a 
                                className="
                                text-sky-500
                                cursor-pointer
                                hover:text-sky-600">
                                    Faça login!
                                </a>
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </React.Fragment>
    )
}