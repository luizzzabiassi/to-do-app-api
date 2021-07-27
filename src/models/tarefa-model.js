const moment = require('moment')

class Task {
    constructor(titulo, descricao, status, userId){
        this.titulo = titulo;
        this.descricao = descricao;
        this.status = status;
        this.data_criacao = moment(Date.now()).format('YYYY-MM-DD');
        this.userId = userId
    }
}

module.exports = Task