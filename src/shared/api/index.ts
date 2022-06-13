import { IComment, ICommentsPage, IRate, IApi } from "../types"
import fakeApi from './fakeApi'

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

    setApi(api: IApi) {
        this.api = api
    }
}

const api = new API()
export default api