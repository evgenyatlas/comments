import { IComment } from 'shared/types'
import { ReplyBtn } from 'features/messageForm'
import { Rate } from 'features/rate'
import styles from './ActionsComment.module.css'

interface ActionsProps {
    className?: string
    comment: IComment
}

export function ActionsComment({ comment }: ActionsProps) {
    return (
        <div className={styles.ActionsComment}>
            {!comment.parentId && <ReplyBtn commentId={comment.id} />}
            <Rate comment={comment} />
        </div>
    )
}
