const User = require("../models/usuario-model")
const UserDao = require("../dao/UserDao")

module.exports = (app, db) => {
    let userBanco = new UserDao(db)

    app.get('/users', async (req, res) => {
        try{
            let results = await userBanco.getAllUsers()
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

    app.get('/users/:id', async (req, res) => {
        const { id } = req.params;
        try{
            if(parseInt(id)){
                let results = await userBanco.getIdUser(id)
                if(results){
                    res.json({
                        result: results,
                        count: results.length
                    })
                }
                else{
                    throw new Error("Nenhum usuário encontrado.")
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

    app.delete('/users/:id', async (req, res) => {
        let { id } = req.params;
        try{
            await userBanco.deleteUser(id)
            res.status(200).json({
                message: `Usuário com id: ${id}, foi deletado com sucesso.`,
                error: false
            })
        }
        catch(err){
            res.status(500).json({
                message: `Erro ao deletar usuário com o id: ${id}.`,
                serverLog: err.message,
                error: true
            })
        }
        
    })

    app.post('/users', async (req, res) => {
        const { nome, email, senha } = req.body
        let newUser = new User(nome, email, senha)
        try{
            await userBanco.insertUser(newUser)
            res.status(201).json({
                message: "Usuário criado com sucesso.",
                error: false
            })
        }
        catch(err){
            res.status(500).json({
                message: "Erro ao criar usuário.",
                serverLog: err.message,
                error: true
            })
        }
    })

    app.put('/users/:id', async (req, res) => {
        const { nome, email, senha } = req.body;
        const { id } = req.params;

        try{
            await userBanco.updateUser(id, nome, email, senha);
            res.status(200).json({
                message: `Usuário com id: ${req.params.id}, foi atualizado com sucesso.`,
                error: false
            })
        }
        catch(err){
            res.status(500).json({
                message: "Não foi possível atualizar o usuário, verifique se o campo passado é valido.",
                serverLog: err.message,
                error: true
            })
        }
    })
}