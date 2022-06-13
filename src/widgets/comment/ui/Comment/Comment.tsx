import styles from './Comment.module.css'
import { IComment } from 'shared/types'
import { Actions } from '../Actions/Actions'
import timeAgo from 'shared/lib/timeAgo'
import { LengthLine } from 'shared/ui/LengthLine/LengthLine'
import { ReplyMessageForm } from 'features/messageForm'

export interface CommentProps {
    className?: string
    comment: IComment,
}


export function Comment({ className, comment }: CommentProps) {
    return (
        <>
            <div className={`${styles.Comment} ${className ? ' ' + className : ''} ${!!comment.parentId ? styles.Comment_nested : ''}`}>
                <div className={styles.Comment__Top}>
                    <div className={styles.Comment__UserName}>{comment.userName}</div>
                    <div className={styles.Comment__Date}>{timeAgo(comment.date)}</div>
                </div>
                <div className={styles.Comment__Text}>{comment.text}</div>
                <Actions comment={comment} />
            </div>
            <ReplyMessageForm commentId={comment.id} />
            <RepliesComments comments={comment.comments} />
        </>
    )
}

function RepliesComments({ comments }: { comments: IComment[] }) {
    return (
        comments.length > 0 ?
            <LengthLine>
                {
                    comments.map(comment =>
                        <Comment key={comment.id} className={styles.Comment_nested} comment={comment} />
                    )
                }
            </LengthLine>
            :
            null
    )
}