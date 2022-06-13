import { IComment, IRate, IApi } from '../../types'
import { getComment } from '../../lib/getComment'
import * as localComments from './lib/localComments'
import rawData from './data.json'
import { addReplyComments } from '../../lib/addReplyComment'
import { arrToMap } from '../../lib/arrToMap'
import { addRate } from './lib/addRateComment'
import { createComment } from '../../../entities/comment/lib/createComment'
import { delayRange } from './lib/delayRange'

interface ICacheComments {
    list: IComment[]
    map: Record<number, IComment>
}

class Comment implements IApi {
    private cacheComments: ICacheComments = { list: rawData as IComment[], map: {} }

    constructor(private delayRange: [number, number] = [100, 400]) {
        this.init()
    }

    private init() {
        const savedComments = localComments.get()
        const replyComments = []
        for (let i = 0; i < savedComments.length; i++) {
            const comment = savedComments[i]
            // //reply (nested) comment
            if (comment.parentId) {
                replyComments.push(comment)
                continue
            }
            this.cacheComments.list.push(comment)
        }
        //reply comment
        this.cacheComments.map = arrToMap(this.cacheComments.list, 'id') as Record<number, IComment>
        replyComments.forEach(comment => addReplyComments(comment, this.cacheComments.map))

        const rates = localComments.getRate()

        for (let i = 0; i < rates.length; i++) {
            const rate = rates[i];
            const comment = getComment(rate.id, rate.parentId, this.cacheComments.map)
            if (comment)
                addRate(rate, comment)
        }

        this.cacheComments.list = this.cacheComments.list.sort(
            (a, b) => b.date - a.date
        )

    }

    async get({ limit = 6, skip = 0 }: { limit?: number, skip?: number } = {}): Promise<{
        comments: IComment[]
        numberComments: number
    }> {
        await delayRange(this.delayRange)
        return {
            comments: this.cacheComments.list.slice(skip, skip + limit),
            numberComments: this.cacheComments.list.length
        }
    }

    async send(data: Pick<IComment, 'userName' | 'text' | 'parentId'>): Promise<IComment> {
        const { userName, text, parentId } = data
        const comment = createComment({ userName, text, parentId })
        this.addToCache(comment)
        localComments.save(comment)
        return comment
    }

    async rate(data: IRate): Promise<IComment> {
        // await delayRange(this.delayRange)
        const comment = getComment(data.id, data.parentId, this.cacheComments.map)
        if (!comment) throw new Error('Comment not found')
        //like
        if (data.userRating === 1) {
            comment.like += comment.userRating === 1 ? -1 : 1
            comment.dislike += comment.userRating === -1 ? -1 : 0
            comment.userRating = comment.userRating === 1 ? 0 : 1
        }
        //dislike
        else if (data.userRating === -1) {
            comment.dislike += comment.userRating === -1 ? -1 : 1
            comment.like += comment.userRating === 1 ? -1 : 0
            comment.userRating = comment.userRating === -1 ? 0 : -1
        }
        localComments.saveRate({
            id: comment.id,
            parentId: comment.parentId,
            userRating: comment.userRating
        })
        return comment
    }

    private addToCache(comment: IComment) {
        //if comment is reply (nested)
        // if (comment.parentId) {
        //     this.cacheComments.map[comment.parentId].comments.unshift(comment)
        //     return
        // }

        this.cacheComments.map[comment.id] = comment
    }
}

export default new Comment()