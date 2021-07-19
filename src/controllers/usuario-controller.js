const User = require("../models/usuario-model")

module.exports = (app, db) => {
    app.get('/users', (req, res) => {
        db.all("select * from USUARIOS", (err, rows) => {
            if(err){
                res.json({
                    message: "Erro ao obter usuários.",
                    error: true
                })
            }
            else{
                res.json({
                    result: rows,
                    count: rows.length
                })
            }
        })
    })

    app.get('/users/:email', (req, res) => {
        let arrayResp = db.users.filter(element => {
            return element.email === req.params.email
        })
        res.json({
            result: arrayResp,
            count: arrayResp.length
        })
    })

    app.delete('/users/:email', (req, res) => {
        let arrayCount = db.users.length
        db.users = db.users.filter(element => {
            return element.email !== req.params.email
        })
        if(arrayCount === db.users.length){
            res.json({
                message: `Não existe usuário com esse email: ${req.params.email}`,
                error: true
            })
        }
        else{
            res.json({
                message: `Usuário com email: ${req.params.email}, foi deletado com sucesso.`,
                error: false
            })
        }
    })

    app.post('/users', (req, res) => {
        const {nome, email, senha} = req.body
        let newUser = new User(nome, email, senha)
        db.users.push(newUser)
        console.log(req.body);
        res.json({
            message: 'Usuário criado com sucesso.',
            error: false
        })
    })

    app.put('/users/:email', (req, res) => {
        const {nome, email, senha} = req.body;
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