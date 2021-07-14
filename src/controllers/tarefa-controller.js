const Task = require("../models/tarefa-model")

module.exports = (app, db) => {
    app.get('/tasks', (req, res) => {
        res.json({
            result: db.tasks,
            count: db.tasks.length
        })
    })

    app.get('/tasks/:titulo', (req, res) => {
        let arrayResp = db.tasks.filter((element) => {
            return element.titulo === req.params.titulo
        })
        res.json({
            result: arrayResp,
            count: arrayResp.length
        })
    })

    app.delete('/tasks/:titulo', (req, res) => {
        let arrayCount = db.tasks.length
        db.tasks = db.tasks.filter((element) => {
            return element.titulo !== req.params.titulo
        })
        if(arrayCount === db.tasks.length){
            res.json({
                message: `Não existe tarefa com esse título: ${req.params.titulo}`,
                error: true
            })
        }
        else{
            res.json({
                message: `Tarefa com título: ${req.params.titulo}, foi deletada com sucesso.`,
                error: false
            })
        }
    })

    app.post('/tasks', (req, res) => {
        const {titulo, descricao, status, data_criacao} = req.body
        let newTask = new Task(titulo, descricao, status, data_criacao)
        db.tasks.push(newTask)
        res.json({
            message: 'Tarefa criada com sucesso.',
            error: false
        })
    })
}