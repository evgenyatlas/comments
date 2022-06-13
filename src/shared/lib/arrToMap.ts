export function arrToMap<T extends { [index: string]: any }>(arr: Array<T>, keyId: string): Record<string, T> {
    const map: Record<string, T> = {}
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        map[item[keyId]] = item
    }
    return map
}