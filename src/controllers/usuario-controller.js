module.exports = app => {
    app.get('/users', (req, res) => {
        res.send('Rota ativada com GET e recurso Usuários: Valores de usuários devem ser retornados.')
    })
}