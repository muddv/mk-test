import express from 'express'

const app = express()

app.get('/', (req, res) => {
    let greet = hello()
    res.send(greet)
})

app.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000')
})

function hello() {
    return "hello"
}

