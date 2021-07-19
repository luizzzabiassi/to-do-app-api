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
}

module.exports = TaskDao