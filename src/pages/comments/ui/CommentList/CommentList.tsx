import { useList } from 'effector-react'
import { $commentList } from 'entities/comment'
import { Comment } from 'entities/comment/ui/Comment'
import { ReplyMessageForm } from 'features/messageForm'
import { IComment } from 'shared/types'
import { LengthLine } from 'shared/ui/LengthLine'
import { ActionsComment } from 'widgets/ActionsComment'
import styles from './CommentList.module.css'


interface CommentListProps {
    className?: string
}



export function CommentList({ className }: CommentListProps) {
    const comments = useList(
        $commentList,
        (comment) => {
            return (
                <>
                    <Comment
                        key={comment.id}
                        comment={comment}
                        className={styles.CommentList__Item}
                        Actions={ActionsComment}
                    />
                    <ReplyMessageForm commentId={comment.id} />
                    <RepliesComments comments={comment.comments} />
                </>
            )
        }
    )
    return (
        <div className={`${styles.CommentList} ${className || ''}`}>
            {comments}
        </div>
    )
}


function RepliesComments({ comments }: { comments: IComment[] }) {
    return (
        comments.length > 0 ?
            <LengthLine>
                {
                    comments.map(comment =>
                        <Comment
                            key={comment.id}
                            className={styles.Comment_nested}
                            comment={comment}
                        />
                    )
                }
            </LengthLine>
            :
            null
    )
}