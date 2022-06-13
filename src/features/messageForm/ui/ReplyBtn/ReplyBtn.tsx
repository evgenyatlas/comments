import styles from './ReplyBtn.module.css'
import { clearReplyForm, showReplyForm } from '../../model'
import { useActiveReply } from '../../lib/useActiveReply'

interface ReplyBtnProps {
    className?: string
    commentId: number
}

export function ReplyBtn(props: ReplyBtnProps) {

    const active = useActiveReply(props.commentId)

    return (
        !active
            ?
            <Reply {...props} />
            :
            <Close />
    )
}

function Reply({ className, commentId }: ReplyBtnProps) {
    return (
        <div
            className={`${styles.ReplyBtn} ${className || ''}`}
            onClick={() => showReplyForm({ commentId: commentId })}
        >
            <img src="/img/reply-icon.svg" alt="reply" />ОТВЕТИТЬ
        </div>
    )
}

function Close({ className }: { className?: string }) {
    return (
        <div
            className={`${styles.ReplyBtn} ${styles.ReplyBtn_close} ${className || ''}`}
            onClick={() => clearReplyForm()}
        >
            <img src="/img/close-com.svg" alt="close" />ЗАКРЫТЬ
        </div>
    )
}