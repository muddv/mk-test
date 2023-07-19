import pg from 'pg'
const { Client } = pg


const cfg = {
    database: 'moyklass-test',
    user: 'dimon'
}

// TODO remove any
export async function queryDb(config: pg.QueryConfig<any>) {
    const client = new Client(cfg)
    await client.connect()
    const res = await client.query(config)
    await client.end()
    //access data: res.rows[0]
    return res
}
