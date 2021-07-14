const express = require('express')
const app = express()
const port = 3000

const rotaUsers = require('./controllers/usuario-controller')
const rotaTasks = require('./controllers/tarefa-controller')

const User = require('./models/usuario-model')
const Task = require('./models/tarefa-model')

const db = require('./infra/bd')

app.use(express.json())

rotaUsers(app, db)
rotaTasks(app, db)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})