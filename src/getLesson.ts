import { queryDb } from "./queryDb.js"

type Student = {
    id: string,
    name: string,
    visit: boolean
}

type Teacher = {
    id: string,
    name: string
}

type Lesson = {
    id: string,
    date: Date,
    title: string,
    status: boolean,
    visitCount: number,
    students: Student[],
    teachers: Teacher[],
}

type getLessonOptions = {
    date?: [Date, Date] | Date,
    title: String[],
    status?: boolean,
    teacherIds: String[],
    studentCount?: [number, number] | number,
    page: number,
    lessonsPerPage: number
}

const defaultOptions: getLessonOptions = {
    title: [],
    teacherIds: [],
    page: 1,
    lessonsPerPage: 5
}

export async function getLessons(opts: getLessonOptions = defaultOptions): Promise<Lesson[] | void> {
    // todo validate query
    let query = 'SELECT * FROM lessons;'//buildGetQuery(opts)
    let res = await queryDb(query)
    console.log(res.rows[0])
}

function buildGetQuery(opts: getLessonOptions): string {
    // TODO calculate limit and offset
    let limit, offset
    let and = false
    let i = 1
    let query = 'SELECT * FROM lessons'
    
    // TODO range
    if (opts.date) {
        query.concat(` WHERE date = $${i}`)
        i++
        and = true
    }
    if (opts.status) {
        and ? query.concat(' AND') : query.concat(' WHERE')
        query.concat(` status = $${i}`)
        i++
        and = true
    }
    if (opts.teacherIds) {
        and ? query.concat(' AND') : query.concat(' WHERE')
        query.concat(`WHERE id IN (SELECT lesson_id FROM lesson_teachers WHERE teacher_id in ($${i})`)
        i++
        and = true
    }
    if (opts.studentCount) {
        and ? query.concat(' AND') : query.concat(' WHERE')
        query.concat(`WHERE id IN (SELECT lesson_id FROM lesson_students GROUP BY lesson_id HAVING COUNT(DISTINCT(student_id)) > $${i})`)
    }
    query.concat(` LIMIT = $${i}`)
    i++
    offset && query.concat(` OFFSET = $${i}`)

    return query
}
