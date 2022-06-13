import { useStoreMap } from "effector-react"
import { $replyForm } from "../model"

export function useActiveReply(commentId: number) {
    return useStoreMap({
        store: $replyForm,
        keys: [],
        fn: (replyForm) => replyForm.commentId === commentId
    })
}

