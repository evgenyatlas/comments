import { IComment, IRate } from "../../../types"

const key = "comment-reviews"
const keyRate = key + "-rate"

export function get(): IComment[] {
    if (typeof window === 'undefined') return []
    const rawComments = localStorage.getItem(key)

    return rawComments ? JSON.parse(rawComments) : []
}

export function save(comment: IComment) {
    if (typeof window === 'undefined') return
    const rawComments = localStorage.getItem(key)
    const comments = rawComments ? JSON.parse(rawComments) : []
    localStorage.setItem(key, JSON.stringify([comment, ...comments]))
}

export function saveRate(rate: IRate) {
    if (typeof window === 'undefined') return
    const rawRates = localStorage.getItem(keyRate)
    const rates = rawRates ? JSON.parse(rawRates) : {}
    localStorage.setItem(keyRate, JSON.stringify({ ...rates, [rate.id]: rate }))
}

export function getRate(): IRate[] {
    if (typeof window === 'undefined') return []
    const rawRates = localStorage.getItem(keyRate)

    return rawRates ? Object.values(JSON.parse(rawRates)) : []
}