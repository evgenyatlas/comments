export type ICommentMap = Record<number, IComment>

export interface IComment {
    id: number
    userName: string
    date: number
    text: string
    comments: IComment[]
    like: number
    parentId?: number
    dislike: number
    userRating: number
}

export interface ICommentsPage {
    comments: IComment[]
    numberComments: number
}

export type IRate = Pick<IComment, 'id' | 'parentId' | 'userRating'>

export type IUser = {
    name: string
}

export interface IApi {
    get(props: { limit?: number, skip?: number }): Promise<ICommentsPage>
    send(props: Pick<IComment, 'userName' | 'text' | 'parentId'>): Promise<IComment>
    rate(props: IRate): Promise<IComment>
    auth(props: IUser): Promise<IUser>
}