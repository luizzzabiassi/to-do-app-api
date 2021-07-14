var idUser = 0;
class User {
    constructor(nome, email, senha){
        this.id = idUser++;
        this.nome = nome;
        this.email = email;
        this.senha = senha
    }
}

module.exports = User