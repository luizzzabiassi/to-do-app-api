const Task = require("../models/tarefa-model")
const TaskDao = require("../dao/TaskDao")

module.exports = (app, db) => {
    let taskBanco = new TaskDao(db)
    app.get('/tasks', (req, res) => {
        taskBanco.getAllTasks().then(rows => {
            res.json({
                result: rows,
                count: rows.length
            })
        })
        .catch(err => {
            res.json({err})
        })
        /*db.all("select * from TAREFAS", (err, rows) => {
            if(err){
                res.json({
                    message: "Erro ao obter tarefas.",
                    error: true
                })
            }
            else{
                res.json({
                    result: rows,
                    count: rows.length
                })
            }
        })*/
    })

    app.get('/tasks/:titulo', (req, res) => {
        let arrayResp = db.tasks.filter(element => {
            return element.titulo === req.params.titulo
        })
        res.json({
            result: arrayResp,
            count: arrayResp.length
        })
    })

    app.delete('/tasks/:titulo', (req, res) => {
        let arrayCount = db.tasks.length
        db.tasks = db.tasks.filter(element => {
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
        db.run(`INSERT INTO TAREFAS VALUES(?, ?, ?, ?, ?, ?)`, [null, newTask.titulo, newTask.descricao, newTask.status, newTask.data_criacao, 1], err => {
            if(err){
                res.json({
                    message: "Erro ao criar tarefa.",
                    error: true
                })
            }
            else{
                res.json({
                    message: "Tarefa criada com sucesso.",
                    error: false
                })
            }
        })
        /*db.tasks.push(newTask)
        res.json({
            message: 'Tarefa criada com sucesso.',
            error: false
        })*/
    })

    app.put('/tasks/:titulo', (req, res) => {
        const {titulo, descricao, status, data_criacao} = req.body;
        var varCount = 0;
        if(titulo || descricao || status || data_criacao){
            db.tasks.forEach(element => {
                if(element.titulo === req.params.titulo){
                    if(titulo){
                        element["titulo"] = titulo;
                    }
                    if(descricao){
                        element["descricao"] = descricao;
                    }
                    if(status){
                        element["status"] = status;
                    }
                    if(data_criacao){
                        element["data_criacao"] = data_criacao;
                    }
                    varCount++
                }
            })
            if(!varCount){
                res.json({
                    message: `Não existe tarefa com esse título: ${req.params.titulo}`,
                    error: true
                })
            }
            else{
                res.json({
                    message: `Tarefa com título: ${req.params.titulo}, foi atualizada com sucesso.`,
                    error: true,
                    count: varCount
                })
            }
        }
        else{
            res.json({
                message: "Não foi possível atualizar a tarefa, verifique se campo passado é valido.",
                error: true
            })
        }
    })
}