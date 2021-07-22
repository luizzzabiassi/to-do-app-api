class Task {
    constructor(titulo, descricao, status, data_criacao, userId){
        this.titulo = titulo;
        this.descricao = descricao;
        this.status = status;
        this.data_criacao = data_criacao;
        this.userId = userId
    }
}

module.exports = Task