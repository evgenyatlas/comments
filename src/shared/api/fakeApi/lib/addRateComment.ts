import { IComment, IRate } from "../../../types"

export function addRate(rate: IRate, comment: IComment) {
    if (!comment) return
    if (rate.userRating === 1) {
        comment.like = comment.like !== undefined ? comment.like + 1 : 1
    } else if (rate.userRating === -1) {
        comment.dislike = comment.dislike !== undefined ? comment.dislike + 1 : 1
    }
    comment.userRating = rate.userRating
}