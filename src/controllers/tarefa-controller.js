module.exports = app => {
    app.get('/tasks', (req, res) => {
        res.send('Rota ativada com GET e recurso Tarefas: Valores de tarefas devem ser retornados.')
    })

    app.post('/tasks', (req, res) => {
        res.send('Rota POST de tarefa ativada: tarefa adicionada ao banco de dados.')
        console.log(req.body)
    })
}