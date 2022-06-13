function padNumber(n: number) {
    return (n < 10) ? ("0" + n) : n
}

function declOfNum(n: number, titles: Array<unknown>) {
    return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}

function timeLikeVK(date: number | Date) {
    const months: Record<number, string> = {
        0: 'янв',
        1: 'фев',
        2: 'мар',
        3: 'апр',
        4: 'мая',
        5: 'июн',
        6: 'июл',
        7: 'авг',
        8: 'сен',
        9: 'окт',
        10: 'ноя',
        11: 'дек'
    }

    const now = Date.now()
    const timeDiff = new Date(date)
    const diff = now - (date instanceof Date ? date.getTime() : date)
    if (diff < 1000 * 60 * 1.5) {
        return 'только что'
    } else if (diff > 1000 * 5 && diff < 1000 * 60 * 60) {
        const time = Math.round(diff / 1000 / 60)
        return time + ' ' + declOfNum(time, ['минуту', 'минуты', 'минут']) + ' назад'
    } else if (diff > 1000 * 60 * 60 && diff < 1000 * 60 * 60 * 24) {
        const time = Math.round(diff / 1000 / 60 / 60)
        return time + ' ' + declOfNum(time, ['час', 'часа', 'часов']) + ' назад'
    } else if (diff > 1000 * 60 * 60 * 24 && timeDiff.getFullYear() === new Date().getFullYear()) {
        const day = timeDiff.getDate()
        var hours = timeDiff.getHours()
        const minutes = timeDiff.getMinutes()
        return day + ' ' + months[timeDiff.getMonth()] + ' в ' + hours + ':' + padNumber(minutes)
    } else {
        const day = timeDiff.getDate()
        return day + ' ' + months[timeDiff.getMonth()] + ' ' + timeDiff.getFullYear()
    }
}

export default timeLikeVK