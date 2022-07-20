import { useEffect } from 'react'
import { IApi } from 'shared/types'
import { fetchCommentsFx, NumberComment } from 'entities/comment'
import { MessageForm } from 'features/messageForm'
import { LoadMore } from 'features/loadMore'
import { CommentList } from '../CommentList'
import apiComment from 'shared/api'

import styles from './CommentsPage.module.css'
import { AuthForm } from 'features/auth'


interface ICommentsPageProps {
    api?: IApi
}
export function CommentsPage({ api }: ICommentsPageProps) {

    useEffect(() => {
        if (api) {
            apiComment.setApi(api)
        }
        fetchCommentsFx()
    }, [api])

    return (
        <div className={styles.CommentsPage}>
            <AuthForm />
            <MessageForm />
            <NumberComment className={styles.CommentsPage__Number} />
            <CommentList className={styles.CommentsPage__ListComment} />
            <LoadMore className={styles.CommentsPage__LoadMore} />
        </div>
    )
}