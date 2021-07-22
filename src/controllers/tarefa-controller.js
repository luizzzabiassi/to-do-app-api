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
    })

    app.get('/tasks/:titulo', (req, res) => {
        taskBanco.getTitleTask(req.params.titulo)
        .then(rows => {
            res.json({
                result: rows,
                count: rows.length
            })
        })
        .catch(err => {
            res.json({err})
        })
    })

    app.delete('/tasks/:titulo', (req, res) => {
        taskBanco.deleteTask(req.params.titulo)
        .then(() => {
            res.status(200).json({
                message: `Tarefa com título: ${req.params.titulo}, foi deletado com sucesso.`,
                error: false
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: `Erro ao deletar tarefa com o titulo: ${req.params.titulo}.`,
                error: true
            })
        })
    })

    app.post('/tasks', (req, res) => {
        const { titulo, descricao, status, data_criacao, userId } = req.body
        let newTask = new Task(titulo, descricao, status, data_criacao, userId)
        taskBanco.insertTask(newTask)
        .then(() => {
            res.status(201).json({
                message: "Tarefa criada com sucesso.",
                error: false
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Erro ao criar tarefa.",
                error: true
            })
        })
    })

    app.put('/tasks/:titulo', (req, res) => {
        const { titulo, descricao, status, data_criacao, userId } = req.body;
        var varCount = 0;
        if(titulo || descricao || status || data_criacao || userId){
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
                    if(userId){
                        element["userId"] = userId;
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