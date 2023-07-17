import pg from 'pg'
const { Client } = pg;

const cfg = {
    database: 'moyklass-test',
    user: 'dimon'
}

export async function queryDb(query: string) {
    const client = new Client(cfg)
    await client.connect()
    const res = await client.query(query)
    await client.end()
    //access data: res.rows[0]
    return res
}
