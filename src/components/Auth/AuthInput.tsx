interface AuthInputProps {
    label: string,
    type: 'text' | 'email' | 'password',
    placeholder: string,
    mandatory: boolean,
    value: any,
    changeValue: (newValue: any) => void
}

export default function AuthInput(props: AuthInputProps) {
    return (
        <div className="
            flex flex-col gap-2">
            <label className="
                text-gray-700 text-lg font-medium">
                {props.label}
            </label>

            <input 
            type={props.type ?? 'text'}
            placeholder={props.placeholder}
            required={props.mandatory} 
            value={props.value}
            onChange={e => props.changeValue?.(e.target.value)}
            className="
                bg-gray-50 p-2
                border-2 border-gray-50
                text-gray-700
                rounded-md
                focus:outline-none
                focus:border-sky-500
                focus:bg-white" />
        </div>
    )
}