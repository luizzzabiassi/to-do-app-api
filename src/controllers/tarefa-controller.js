const Task = require("../models/tarefa-model")
const TaskDao = require("../dao/TaskDao")

module.exports = (app, db) => {
    let taskBanco = new TaskDao(db)

    app.get('/tasks', async (req, res) => {
        try{
            let results = await taskBanco.getAllTasks();
            res.json({
                result: results,
                count: results.length
            })
        } 
        catch(err){
            res.status(500).json({
                message: err.message,
                error: true
            })
        }
    })

    app.get('/tasks/:id', async (req, res) => {
        const { id } = req.params;
        try{
            if(parseInt(id)){
                let results = await taskBanco.getIdTask(id)
                if(results){
                    res.json({
                        result: results,
                        count: results.length
                    })
                }
                else{
                    throw new Error("Nenhuma tarefa encontrada.")
                }
            }
            else{
                throw new Error("É esperado um ID do tipo INT.")
            }
        }
        catch(err){
            res.status(500).json({
                message: err.message,
                error: true
            })
        }
    })

    app.delete('/tasks/:id', async (req, res) => {
        const { id } = req.params;
        try{
            await taskBanco.deleteTask(id);
            res.status(200).json({
                message: `Tarefa com id: ${req.params.id}, foi deletada com sucesso.`,
                error: false
            })
        }
        catch(err){
            res.status(500).json({
                message: `Erro ao deletar tarefa com o id: ${req.params.id}.`,
                serverLog: err.message,
                error: true
            })
        }
    })

    app.post('/tasks', async (req, res) => {
        const { titulo, descricao, status, userId } = req.body;
        let newTask = new Task(titulo, descricao, status, userId)
        try{
            await taskBanco.insertTask(newTask)
            res.status(201).json({
                message: "Tarefa criada com sucesso.",
                error: false
            })
        }
        catch(err){
            res.status(500).json({
                message: "Erro ao criar tarefa.",
                serverLog: err.message,
                error: true
            })
        }
    })

    app.put('/tasks/:id', async (req, res) => {
        const { titulo, descricao, status, userId } = req.body;
        const { id } = req.params;
        
        try{
            await taskBanco.updateTask(id, titulo, descricao, status, userId)
            res.status(200).json({
                message: `Tarefa com id: ${id}, foi atualizada com sucesso.`,
                error: false
            })
        }
        catch(err){
            res.status(500).json({
                message: "Não foi possível atualizar a tarefa, verifique se campo passado é valido.",
                serverLog: err.message,
                error: true
            })
        }
    })
}