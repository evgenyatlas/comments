import { useList } from 'effector-react'
import { $commentList } from 'entities/comment'
import { Comment } from 'widgets/comment'
import styles from './CommentList.module.css'

interface CommentListProps {
    className?: string
}

export function CommentList({ className }: CommentListProps) {
    const comments = useList(
        $commentList,
        (comment) =>
            <Comment
                key={comment.id}
                comment={comment}
                className={styles.CommentList__Item}
            />
    )

    return (
        <div className={`${styles.CommentList} ${className || ''}`}>
            {comments}
        </div>
    )
}
