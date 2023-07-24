# Tecтовое задание moyklass

## Задача
Требуется создать веб-сервер на базе KoaJS или ExpressJS, который будет работать с данными по
занятиям. Данные хранятся в СУБД PostgreSQL, дамп тестовых данных прилагается к тестовому
заданию.
Предлагается сделать 2 задачи. Первая - запрос данных, вторая - манипуляция с данными.
Исполнителю предлагается сделать задачу, выбирая адекватные инструменты и общепринятые
способы организации кода и API-интерфейсов, учитывая указанные в задании требования.
Необходимо написать тесты для созданных методов.
При разработке учитывать, что данных может быть очень много (миллионы занятий).

# Notes
https://wiki.archlinux.org/title/PostgreSQL - psql info

   OPTS:
   title
   date: 1 date or range
   status
   teacherdIds
   studentsCount: 1 or range
   limit

  
  
    FILTER:
    date                        -   WHERE date = $1 *or range*
    status                      -   WHERE status = $2
    teacherIds                  -   SELECT * FROM lessons WHERE id IN (SELECT lesson_id FROM lesson_teachers WHERE teacher_id = 3);
    studentsCount               -   SELECT * FROM lessons WHERE id IN (SELECT lesson_id FROM lesson_students GROUP BY lesson_id HAVING COUNT(DISTINCT(student_id)) > $4);
    page / lessons per page     - LIMIT $5 OFFSET $6
    
    


# useful cli commands
`sudo systemctl start postgresql.service`
`sudo -iu postgres` - switch to postres user
`psql -d moyklass-test` - launcg test db

`\dt` - list tables


