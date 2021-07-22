const User = require("../models/usuario-model")
const UserDao = require("../dao/UserDao")

module.exports = (app, db) => {
    let userBanco = new UserDao(db) 
    app.get('/users', (req, res) => {
        userBanco.getAllUsers().then(rows => {
            res.json({
                result: rows,
                count: rows.length
            })
        })
        .catch(err => {
            res.json({err})
        })
    })

    app.get('/users/:email', (req, res) => {
        userBanco.getEmailUser(req.params.email)
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

    app.delete('/users/:email', (req, res) => {
        userBanco.deleteUser(req.params.email)
        .then(() => {
            res.status(200).json({
                message: `Usuário com email: ${req.params.email}, foi deletado com sucesso.`,
                error: false
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: `Erro ao deletar usuário com o email: ${req.params.email}.`,
                error: true
            })
        })
    })

    app.post('/users', (req, res) => {
        const { nome, email, senha } = req.body
        let newUser = new User(nome, email, senha)
        userBanco.insertUser(newUser)
        .then(() => {
            res.status(201).json({
                message: "Usuário criado com sucesso.",
                error: false
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Erro ao criar usuário.",
                error: true
            })
        })
    })

    app.put('/users/:email', (req, res) => {
        const { nome, email, senha } = req.body;
        var varCount = 0;
        if(nome || email || senha){
            db.users.forEach(element => {
                if(element.email === req.params.email){
                    if(nome){
                        element["nome"] = nome;
                    }
                    if(email){
                        element["email"] = email;
                    }
                    if(senha){
                        element["senha"] = senha;
                    }
                    varCount++
                }
            })
            if(!varCount){
                res.json({
                    message: `Não existe usuário com esse email: ${req.params.email}`,
                    error: true
                })
            }
            else{
                res.json({
                    message: `Usuário com email: ${req.params.email}, foi atualizado com sucesso.`,
                    error: true,
                    count: varCount
                })
            }
        }
        else{
            res.json({
                message: "Não foi possível atualizar o usuário, verifique se campo passado é valido.",
                error: true
            })
        }
    })
}