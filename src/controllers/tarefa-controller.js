module.exports = app => {
    app.get('/tasks', (req, res) => {
        res.send('Rota ativada com GET e recurso Tarefas: Valores de tarefas devem ser retornados.')
    })
}