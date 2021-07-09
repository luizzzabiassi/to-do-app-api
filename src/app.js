const express = require('express')
const app = express()
const port = 3000

const rotaUsers = require('./controllers/usuario-controller')
const rotaTasks = require('./controllers/tarefa-controller')

app.use(express.json())

rotaUsers(app)
rotaTasks(app)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})