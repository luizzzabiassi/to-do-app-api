class UserDao{
    constructor(db){
        this.db = db;
    }

    getAllUsers(){
        return new Promise((resolve, reject) => {
            this.db.all(`select * from USUARIOS`, (err, rows) => {
                if(err){
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    }
    getIdUser(id){
        return new Promise((resolve, reject) => {
            this.db.get(`select * from USUARIOS where id = ?`, id, (err, rows) => {
                if(err){
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    }
    insertUser(user){
        return new Promise((resolve, reject) => {
            this.db.run(`insert into USUARIOS(nome, email, senha) values(?, ?, ?)`, Object.values(user), err => {
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            })
        })
    }
    deleteUser(id){
        return new Promise((resolve, reject) => {
            this.db.run(`delete from USUARIOS where id = ?`, id, err => {
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            })
        })
    }
    updateUser(id, nome, email, senha){
        if(nome || email || senha){
            let virgula = false;
            let newArray = [];
            let sql = 'UPDATE USUARIOS SET ';

            if(nome){
                sql = sql + ' NOME = ?'
                virgula = true
                newArray.push(nome)
            }
            if(email){
                if(virgula) sql = sql  + ',EMAIL = ?'
                else{
                    sql = sql  + 'EMAIL = ?'
                    virgula = true
                }
                newArray.push(email)
            }
            if(senha){
                if(virgula) sql = sql  + ',SENHA = ?'
                else{
                    sql = sql  + 'SENHA = ?'
                    virgula = true
                }
                newArray.push(senha)
            }

            sql = sql + 'WHERE id = ?'
            newArray.push(id)
            return new Promise((resolve, reject) => {
                this.db.run(sql, newArray, err => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve();
                    }
                })
            })
        }
        else{
            throw new Error('Nenhum atributo enviado.')
        } 
    }
}

module.exports = UserDao