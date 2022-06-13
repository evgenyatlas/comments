export function generateId(): number {
    return Math.round(Math.random() * 1000 + Date.now())
}