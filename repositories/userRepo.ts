import client  from "../db/database.ts"

class UserRepo {
    async addUser(userData: any){

       
         const user = await client.query(
            `INSERT INTO users (username, password, email, createdat) VALUES ($1, $2, $3, $4) RETURNING id`, 
            userData.username, 
            userData.password, 
            userData.email,
            new Date
        )
        return user;
    }

    async getUser(id: string){
         const result = await  client.query(`SELECT * FROM users WHERE id=${id}`);
         return result;
    }
    async getUsers(){
        return client.query(`SELECT email,username, id from users`);
    }

    async updateUser( query: any){
        const result = await client.query(query);
        if(result.rowCount){
            return {
                status: true,
                msg: "User has been updated"
            }
        }else{
            return {
                status: false,
                msg: "cannot update user"
            }
        }

    }

    async deleteUser(id: string){
        const result = await client.query(`DELETE FROM users where id=${id}`);

        if(result.rowCount){
            return {
                status: true,
                msg: "User has been deleted"
            }
        }else{
            return {
                status: false,
                msg: "cannot delete user"
            }
        }
    }
}   

export default new UserRepo();