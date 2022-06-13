import { useStore } from 'effector-react'
import { fetchCommentsFx } from '../../../../entities/comment'
import { $allLoaded, loadMore } from '../../model'
import styles from './LoadMore.module.css'
import { Spinner } from '../../../../shared/ui/Spinner'

interface LoadMoreProps {
    className?: string
}

export function LoadMore({ className }: LoadMoreProps) {
    const fetching = useStore(fetchCommentsFx.pending)
    const allLoaded = useStore($allLoaded)
    return (
        !allLoaded ?
            <button onClick={loadMore as any} className={`${styles.LoadMore}${className ? ' ' + className : ''}`}>
                ЗАГРУЗИТЬ ЕЩЕ <Spinner display={fetching} minDuration={700}></Spinner>
            </button>
            :
            null
    )
}
