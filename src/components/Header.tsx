import Image from 'next/image'
import TailwindIcon from '../icons/tailwindcss.svg'

export default function Header() {
    return (
        <header className="
            bg-gray-300 p-4 w-full 
            flex gap-2 items-center justify-center">
            <Image 
            src={TailwindIcon} 
            alt="TailwindCSS Icon"
            width={40} height={40} />
            <h1 className="text-3xl text-sky-500 text-center font-bold">
                Tail<span className="text-gray-800">form</span>
            </h1>
        </header>
    )
}