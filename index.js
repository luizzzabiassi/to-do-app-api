const express = require('express')
const app = express()
const port = 3000

app.get('/users', (req, res) => {
    res.send('Rota ativada com GET e recurso Usuários: Valores de usuários devem ser retornados.')
})

app.get('/tasks', (req, res) => {
    res.send('Rota ativada com GET e recurso Tarefas: Valores de tarefas devem ser retornados.')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})