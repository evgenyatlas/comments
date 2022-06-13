import React from 'react'
import styles from './Rate.module.css'
import { IComment } from '../../../shared/types'
import { rate } from '../model'

interface RatingProps {
    className?: string
    comment: IComment
}

export function Rate({ comment }: RatingProps) {
    return (
        <>
            <div
                className={`${styles.Rate__Like} ${comment.userRating === 1 ? styles.Rate__Like_active : ''}`}
                onClick={() => rate({ id: comment.id, parentId: comment.parentId, userRating: 1 })}
            >
                <img src="/img/like-button.svg " alt="like" />{comment.like ? <span>{comment.like}</span> : ''}
            </div>
            <div
                className={`${styles.Rate__Dislike} ${comment.userRating === -1 ? styles.Rate__Dislike_active : ''}`}
                onClick={() => rate({ id: comment.id, parentId: comment.parentId, userRating: -1 })
                }>
                <img src="/img/dislike-button.svg" alt="dislike" />{comment.dislike ? <span>{comment.dislike}</span> : ''}
            </div>
        </>
    )
}