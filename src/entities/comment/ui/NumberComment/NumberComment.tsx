import { useStore } from 'effector-react'
import { $numberAllComment } from '../../model'
import styles from './NumberComment.module.css'

interface NumberCommentProps {
    className?: string
}

export function NumberComment({ className }: NumberCommentProps) {
    const numberComment = useStore($numberAllComment)
    return (
        <div className={`${styles.NumberComment}${className ? ' ' + className : ''}`}>
            КОММЕНТАРИИ ({numberComment})
        </div>
    )
}