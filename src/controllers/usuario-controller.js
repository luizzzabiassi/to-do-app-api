const User = require("../models/usuario-model")

module.exports = (app, db) => {
    app.get('/users', (req, res) => {
        res.json({
            result: db.users,
            count: db.users.length
        })
    })

    app.get('/users:email', (req, res) => {
        let arrayResp = db.users.filter((element) => {
            return element.email === req.params.email
        })
        res.json({
            result: arrayResp,
            count: arrayResp.length
        })
    })

    app.delete('/users/:email', (req, res) => {
        let arrayCount = db.users.length
        db.users = db.users.filter((element) => {
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
}