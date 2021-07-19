class UserDao{
    constructor(db){
        this.db = db;
    }
    getAllUsers(){
        return new Promise((resolve, reject) => {
            this.db.all("select * from USUARIOS", (err, rows) => {
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

module.exports = UserDao