import { IComment } from "../types"


function addReply(replyComment: IComment, mapComments: Record<number, IComment>) {
    if (!replyComment.parentId) throw new Error('Comment not nested')
    const parentComment = mapComments[replyComment.parentId]
    if (parentComment) {
        parentComment.comments.push(replyComment)
    }
}

export function addReplyComments(replyComment: IComment | IComment[], mapComments: Record<number, IComment>) {
    if (Array.isArray(replyComment))
        replyComment.forEach((comment) => addReply(comment, mapComments))
    else if (replyComment.parentId)
        addReply(replyComment, mapComments)
}