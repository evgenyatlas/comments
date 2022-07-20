import { setUser } from 'entities/viewer'
import React from 'react'
import { useInput } from 'shared/lib/react/hooks/useInput'
import styles from './AuthForm.module.css'

interface AuthFormProps {
    className?: string
}

export function AuthForm({ className }: AuthFormProps) {
    const [value, onChange] = useInput()
    const submit = (event?: React.ChangeEvent<HTMLInputElement>) => {
        if (!event || !value) return
        event.preventDefault()
        event.stopPropagation()

        setUser({
            name: value
        })
    }

    return (
        <div className={`${styles.AuthForm}${className ? ' ' + className : ''}`}>
            <input
                onKeyDown={e => {
                    if (e.key === 'enter') {
                        submit()
                    }
                }}
                value={value}
                onChange={onChange} />
            <button
                onClick={submit as () => void}
            >
                SEND
            </button>
        </div>
    )
}