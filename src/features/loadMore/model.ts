import { combine, createEvent, sample } from "effector"
import { $numberComment, $numberAllComment, fetchCommentsFx } from "../../entities/comment"

//store
export const $allLoaded = combine(
    $numberComment,
    $numberAllComment,
    (numberComment, numberAllComment) => numberComment >= numberAllComment
)

//event
export const loadMore = createEvent()

//loading new batch of comments
sample({
    //when the loadmore are emitted
    clock: loadMore,
    //get the current number of comments
    source: $numberComment,
    //call the effect with the necessary parameters to load new batch of comments
    fn: (numberComment) => ({ skip: numberComment }),
    target: fetchCommentsFx
})