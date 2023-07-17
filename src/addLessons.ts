// type NewLesson = {
//     teachedIds: string[],
//     title: string,
//     days: number[],
//     firstDate: string,
//     lessonsCount?: number,
//     lastDate?: string
// }

type AddLessonOptions = {
    teachedIds: string[],
    title: string,
    days: number[],
    firstDate: Date,
    lessonsCount?: number,
    lastDate?: Date
}

function addLesson(opts: AddLessonOptions): string[] | void {
    // TODO validate opts
    let query = buildAddQuery(opts)
}

function buildAddQuery(opts: AddLessonOptions): string {
    let query = 'INSERT INTO lessons (date, title, status) '
    query.concat(`VALUES(${opts.firstDate.toString()}, ${opts.title}, 0)`)
    return ''
}
