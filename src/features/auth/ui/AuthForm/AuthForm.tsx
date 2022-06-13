import React from 'react'
import styles from './AuthForm.module.css'

interface AuthFormProps {
    className?: string
}

export function AuthForm({ className }: AuthFormProps) {
    return (
        <div className={`${styles.AuthForm}${className ? ' ' + className : ''}`}>

        </div>
    )
}