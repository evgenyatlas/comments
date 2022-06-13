import { IComment } from 'shared/types'
import { ReplyBtn } from 'features/messageForm'
import { Rate } from 'features/rate'
import styles from './Actions.module.css'

interface ActionsProps {
    className?: string
    comment: IComment
}

export function Actions({ comment }: ActionsProps) {
    return (
        <div className={styles.Actions}>
            {!comment.parentId && <ReplyBtn commentId={comment.id} />}
            <Rate comment={comment} />
        </div>
    )
}
