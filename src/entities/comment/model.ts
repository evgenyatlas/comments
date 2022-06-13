import { createEffect, createEvent, createStore } from 'effector'
import Api from 'shared/api'
import { IComment, ICommentMap } from 'shared/types'
import { addReplyComments } from 'shared/lib/addReplyComment'
import { arrToMap } from 'shared/lib/arrToMap'
import { getComment } from 'shared/lib/getComment'
import { setPayload } from 'shared/lib/effector-kit'

//store
export const $numberAllComment = createStore<number>(1)
//dictionary of comments
export const $commentMap = createStore<ICommentMap>({})
export const $commentList = $commentMap.map((mapComment) => Object.values(mapComment).sort((a, b) => b.date - a.date))
//number of comments displayed
export const $numberComment = $commentList.map(comments => comments.length)

//event
export const setComment = createEvent()
export const addComment = createEvent<IComment | IComment[]>()
export const changeComment = createEvent<IComment>()

//effect
export const fetchCommentsFx = createEffect(Api.get)

$commentMap.on(
    [addComment, fetchCommentsFx.doneData.map(({ comments }) => comments)],
    (comments, addedComment) => {
        //if the addedComment is List
        if (Array.isArray(addedComment)) {
            return {
                ...comments,
                ...arrToMap(addedComment, 'id')
            }
        }

        //if the addeddComment is reply (nested)
        if (addedComment.parentId) {
            const comment = getComment(addedComment.parentId, undefined, comments)
            if (!comment) return

            addReplyComments(addedComment, comments)

            return {
                ...comments,
                [addedComment.parentId]: {
                    ...comment
                }
            }
        }

        return {
            ...comments,
            [addedComment.id]: {
                ...addedComment
            }
        }
    }
)
$numberAllComment.on(
    addComment,
    (numberComment) => numberComment + 1
)
$numberAllComment.on(
    fetchCommentsFx.doneData.map(({ numberComments }) => numberComments),
    setPayload
)
$commentMap.on(changeComment, (comments, updatedComment) => {

    if (updatedComment.parentId) {
        const parentComment = comments[updatedComment.parentId]
        return {
            ...comments,
            [parentComment.id]: {
                ...parentComment,
                comments: parentComment.comments.map((comment) => comment.id === updatedComment.id ? ({ ...updatedComment }) : comment)
            }
        }
    }

    return {
        ...comments,
        [updatedComment.id]: {
            ...updatedComment
        }
    }
})
