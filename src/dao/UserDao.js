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
    getEmailUser(email){
        return new Promise((resolve, reject) => {
            this.db.all(`select * from USUARIOS where email = ?`, email, (err, rows) => {
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
                    resolve(true);
                }
            })
        })
    }
    deleteUser(email){
        return new Promise((resolve, reject) => {
            this.db.run(`delete from USUARIOS where email = ?`, email, err => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            })
        })
    }
}

module.exports = UserDao