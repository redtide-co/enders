import express from 'express'
import mysql from 'mysql'

const app = express()
const port = 3000
const conn = mysql.createConnection({
    user: 'root',
    password: 'm4sgl0b4l',
    database: 'enders'
})

conn.connect((err, ...args) => {
    if (args & args.length) console.debug(args)
    if (err) throw err
    console.info('Database connected!')
})

app.use(express.json())
app.listen(port, () => console.log(`Server running on port ${port}!`))

app.get('/', (req, res) => res.send({ Not: { getting: { away: { with: { the:
    ["valuable", "response", "data"] } } } } }))

app.post('/',
    (req, res) => res.status(201).send(req.body),
    (req, res) => res.sendStatus(418)
)
