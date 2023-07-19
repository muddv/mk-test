import { QueryResult } from "pg";
import type { QueryConfig } from "pg";

import { queryDb } from "./queryDb.js";

type Student = {
  id: string;
  name: string;
  visit: boolean;
};

type Teacher = {
  id: string;
  name: string;
};

type Lesson = {
  id: string;
  date: Date;
  title: string;
  status: boolean;
  visitCount: number;
  students: Student[];
  teachers: Teacher[];
};

type getLessonOptions = {
  date?: Date | [Date, Date];
  status?: boolean;
  teacherIds?: string[];
  studentsCount?: number | [number, number];
  page: number;
  lessonsPerPage: number;
};

const defaultOptions: getLessonOptions = {
  page: 1,
  lessonsPerPage: 5,
};

export async function getLessons(
  opts: getLessonOptions = defaultOptions
): Promise<QueryResult<any> | void> {
  // todo validate query
  let config = buildGetQuery(opts);
  let res = await queryDb(config);
  return res;
}

function buildGetQuery(opts: getLessonOptions): QueryConfig {
  // TODO calculate limit and offset
  let limit, offset;
  let i = 1;
  //
  //SELECT lessons.*, COUNT(lesson_students.visit) visited FROM lessons JOIN lesson_students ON lessons.id = lesson_students.lesson_id WHERE lesson_students.visit = 't' GROUP BY lessons.id;
  //
  //
  let query = "SELECT lessons.*, COUNT(lesson_students.visit) visited FROM lessons JOIN lesson_students ON lessons.id = lesson_students.lesson_id WHERE lesson_students.visit = 't' GROUP BY lessons.id"

  let params = [];

  // TODO range
  if (opts.date) {
    query += ` date = $${i}`;
    params.push(opts.date);
    i++;
  }
  if (opts.status !== undefined) {
    query += ` AND status = $${i}`;
    params.push(opts.status ? "1" : "0");
    i++;
  }
  if (opts.teacherIds) {
    query += ` AND id IN (SELECT lesson_id FROM lesson_teachers WHERE teacher_id in ($${i})`;
    params.push(opts.teacherIds);
    i++;
  }
  if (opts.studentsCount) {
    query += ` AND id IN (SELECT lesson_id FROM lesson_students GROUP BY lesson_id HAVING COUNT(DISTINCT(student_id)) > $${i})`;
    params.push(opts.studentsCount);
    i++;
  }

  query += ` JOIN lesson_students ON lesson_students.lesson_id = lessons.id`
  query += ` JOIN lesson_teachers ON lesson_teachers.lesson_id = lessons.id`
  query += ` LIMIT $${i}`;





  params.push(opts.lessonsPerPage);
  i++;
  if (offset) {
    query += ` OFFSET $${i}`;
    params.push(opts.page * opts.lessonsPerPage);
  }

  return { text: query, values: params };
}

getLessons()
