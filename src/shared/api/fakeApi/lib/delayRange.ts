export async function delayRange(range: [number, number]) {
    return new Promise(resolve => setTimeout(resolve, Math.random() * (range[1] - range[0]) + range[0]))
}