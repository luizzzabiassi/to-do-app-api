class TaskDao{
    constructor(db){
        this.db = db;
    }

    getAllTasks(){
        return new Promise((resolve, reject) => {
            this.db.all("select * from TAREFAS", (err, rows) => {
                if(err){
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    }
    getIdTask(id){
        return new Promise((resolve, reject) => {
            this.db.get(`select * from TAREFAS where id = ?`, id, (err, rows) => {
                if(err){
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
        })
    }
    insertTask(task) {
        return new Promise((resolve, reject) => {
            this.db.run(`insert into TAREFAS(titulo, descricao, status, dataCriacao, id_usuario) values(?, ?, ?, ?, ?)`, Object.values(task), err => {
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            })
        })
    }
    deleteTask(id){
        return new Promise((resolve, reject) => {
            this.db.run(`delete from TAREFAS where id = ?`, id, err => {
                if(err){
                    reject(err);
                }
                else{
                    resolve();
                }
            })
        })
    }
    updateTask(id, titulo, descricao, status){
        if(titulo || descricao || status){
            let virgula = false
            let newArray = []
            let sql = 'UPDATE TAREFAS SET '
            
            if(titulo){
                sql = sql + ' TITULO = ?'
                virgula = true
                newArray.push(titulo)
            }
            if(descricao){
                if(virgula) sql = sql  +',DESCRICAO = ?'
                else{
                    sql = sql  +'DESCRICAO = ?'
                    virgula = true
                }
                newArray.push(descricao)
            }
            if(status){
                if(virgula) sql = sql  +',STATUS = ?'
                else{
                    sql = sql  +'STATUS = ?'
                    virgula = true
                }
                newArray.push(status)
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

module.exports = TaskDao