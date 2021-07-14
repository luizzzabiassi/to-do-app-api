var idTask = 0;
class Task {
    constructor(titulo, descricao, status, data_criacao){
        this.id = idTask++;
        this.titulo = titulo;
        this.descricao = descricao;
        this.status = status;
        this.data_criacao = data_criacao
    }
}

module.exports = Task