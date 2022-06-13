import React, { ReactNode } from 'react'
import styles from './LengthLine.module.css'

interface LengthLineProps {
    className?: string
    children?: ReactNode
}

export function LengthLine({ className, children }: LengthLineProps) {
    return (
        <div className={`${styles.LengthLine} ${className || ''}`}>
            <div className={styles.LengthLine__Arrow}></div>
            {children}
        </div>
    )
}