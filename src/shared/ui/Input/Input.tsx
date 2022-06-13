import { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    value?: string
    onInputValue?: (v: string) => void
    placeholder?: string
}


export function Input({ className, value, onInputValue, placeholder, ...props }: InputProps) {
    return (
        <div className={`${styles.Input}${className ? ' ' + className : ''}`}>
            <input
                value={value}
                onChange={e => onInputValue && onInputValue(e.target.value)}
                placeholder={placeholder}
                {...props}
            />
        </div>
    )
}