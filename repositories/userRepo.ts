import client  from "../db/database.ts"
import {hashpw, gensalt} from "https://deno.land/x/bcrypt/bcrypt/bcrypt.ts"

class UserRepo {
    async addUser(userData: any){

        const salt = await gensalt(10);
        const hashedPassword = await hashpw(userData.password, salt);
        return client.query(`INSERT INTO beers name = '${userData.name}', password = '${hashedPassword}', email = '${userData.email}'`)
    }

    async getUser(id: string){
        return client.query(``);
    }
    async getUsers(){

    }

    async updateUser(id: string, updateData: any){

    }

    async deleteUser(id: string){

    }
}   

export default new UserRepo();