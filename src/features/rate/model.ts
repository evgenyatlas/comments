import { createEffect, forward } from "effector"
import { changeComment } from "../../entities/comment"
import api from "../../shared/api"
import { IComment } from "../../shared/types"

//effect
export const rate = createEffect(api.rate)

forward<IComment>({
    from: rate.doneData,
    to: changeComment
})