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
    getTitleTask(titulo){
        return new Promise((resolve, reject) => {
            this.db.all(`select * from TAREFAS where titulo = ?`, titulo, (err, rows) => {
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
                    resolve(true);
                }
            })
        })
    }
    deleteTask(titulo){
        return new Promise((resolve, reject) => {
            this.db.run(`delete from TAREFAS where titulo = ?`, titulo, err => {
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

module.exports = TaskDao