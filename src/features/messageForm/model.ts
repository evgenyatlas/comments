import { createEffect, createEvent, createStore, forward, sample } from "effector"
import { $userName } from "../../entities/viewer"
import { addComment } from "../../entities/comment"
import api from "../../shared/api"
import { IComment } from '../../shared/types'

interface IReplyForm {
    commentId: number
}

//REPLY FORM (FOR CREATE A NESTED COMMENTS )
//store
export const $replyForm = createStore<IReplyForm>(
    {
        commentId: 0
    }
)
export const clearReplyForm = createEvent<void>()
export const showReplyForm = createEvent<IReplyForm>()
//handling state changes
$replyForm.on(showReplyForm, (state, data) => data)
$replyForm.reset(clearReplyForm)


export const submit = createEvent<Pick<IComment, 'text' | 'parentId'>>()
export const sendFx = createEffect(api.send)

//Sending the comment (api)
sample({
    //when the form submit happens
    clock: submit,
    //get our user's username
    source: $userName,
    //transform data
    fn: (userName, commentData) => {
        return { userName, ...commentData }
    },
    //send comment (api)
    target: sendFx
})

//add the comment to the store after a successful response from the api
forward({
    from: sendFx.doneData,
    to: addComment
})