import { IComment, ICommentsPage, IRate, IApi, IUser } from "../types"
import fakeApi from './fakeApi'
import { fromObservable, Observable } from 'effector'

class API {
    constructor(
        private api: IApi = fakeApi
    ) { }

    //i use arrow function to bind context
    get = async (props: { limit?: number, skip?: number } = {}): Promise<ICommentsPage> => {
        return this.api.get(props)
    }

    send = async (props: Pick<IComment, 'userName' | 'text' | 'parentId'>): Promise<IComment> => {
        return this.api.send(props)
    }

    rate = async (rate: IRate): Promise<IComment> => {
        return this.api.rate(rate)
    }

    auth = async (user: IUser) => {
        return this.api.auth(user)
    }

    // subscribe(e) {
    //     return ({ unsubscribe: () => undefined })
    // }

    setApi(api: IApi) {
        //reload all methods to get the neded data
        this.api = api
    }
}

const api = new API()
export default api