import { generateId } from "shared/lib/generateId"
import { IComment } from "shared/types"

export function createComment({ userName, text, parentId }: Pick<IComment, "userName" | "text" | "parentId">): IComment {
    return ({
        id: generateId(),
        userName: userName,
        text: text,
        date: new Date().getTime(),
        like: 0,
        dislike: 0,
        parentId,
        comments: [],
        userRating: 0
    })
}