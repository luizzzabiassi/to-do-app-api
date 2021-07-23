const express = require('express')
const cors = require('cors')

const app = express()

const rotaUsers = require('./controllers/usuario-controller')
const rotaTasks = require('./controllers/tarefa-controller')

const User = require('./models/usuario-model')
const Task = require('./models/tarefa-model')
const db = require('./infra/sqlite-db')

app.use(express.json())
app.use(cors())

rotaUsers(app, db)
rotaTasks(app, db)

module.exports = app