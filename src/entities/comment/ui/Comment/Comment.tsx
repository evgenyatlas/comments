import styles from './Comment.module.css'
import { FunctionComponent } from 'react'
import { IComment } from 'shared/types'
import timeAgo from 'shared/lib/timeAgo'


export interface CommentProps {
    className?: string
    comment: IComment,
    Actions?: FunctionComponent<{ comment: IComment }>
}


export function Comment({ className, comment, Actions }: CommentProps) {
    return (
        <>
            <div className={`${styles.Comment} ${className ? ' ' + className : ''} ${!!comment.parentId ? styles.Comment_nested : ''}`}>
                <div className={styles.Comment__Top}>
                    <div className={styles.Comment__UserName}>{comment.userName}</div>
                    <div className={styles.Comment__Date}>{timeAgo(comment.date)}</div>
                </div>
                <div className={styles.Comment__Text}>{comment.text}</div>
                {Actions && <Actions comment={comment} />}
            </div>
        </>
    )
}