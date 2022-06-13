import { IComment } from "../types"

export function getComment(id: number, parentId: number | undefined, mapComments: Record<number, IComment>): IComment | undefined {
    if (parentId) {
        const comment = mapComments[parentId]?.comments?.find(comment => comment.id === id)
        return comment
    }
    return mapComments[id]
}