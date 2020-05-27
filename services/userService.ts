import UserRepo from "../repositories/userRepo.ts"
import {hashpw, gensalt} from "https://deno.land/x/bcrypt/bcrypt/bcrypt.ts"

class UserService {
    constructor(){

    }
    async addUser(userData: any){
        const salt = await gensalt(10);
        const hashedPassword = await hashpw(userData.password, salt);
        const data = {...userData, password: hashedPassword, createdAt: new Date()}

        const result = await UserRepo.addUser(data);
        let id: number;
        result.rows.map(resultArray => {
            id = resultArray[0];
            data.id = id;
        })
        return data;
    }

    async getUser(id: string){
        const users = await UserRepo.getUser(id);
        let result: any = {};
        users.rows.map((user: any) =>{
            result = {};
            users.rowDescription.columns.map((el:any, index:number) =>{
                    result[el.name] = user[index]
            })
        })
        return result;
    }

    async getUsers(){
        const users = await UserRepo.getUsers();

        const result: any = []
        
        users.rows.map((userData) => {
            const object: any = {};
            users.rowDescription.columns.map((el: any, index: number)=>{
                object[el.name] = userData[index];
            });

            result.push(object);
        });

        return result;

    }

    async updateUser(id: string, userData:any){
        const userService: UserService = new UserService()
        const user = await userService.getUser(id);
        
        if(Object.keys(user).length == 0){
            return {
                status: false,
                msg: "User not found"
            }
        }
        let query = `UPDATE users `;
        let hasSet = false;
        if(userData.username){
            if(!hasSet){
                query += ` SET username = '${userData.username}' `
            }else{
                query += ` ,username = '${userData.username}' `;   
            }
            hasSet = true;
        }
        if(userData.password){
            const salt = await gensalt(10);
            const hashedPassword = await hashpw(userData.password, salt);
           
            if(!hasSet){
                query += ` SET password = '${hashedPassword}' `;
            }else{
                query += ` ,password= '${hashedPassword}' `;
            }
            hasSet = true;
        }
        query += ` WHERE id = ${id} `;
        const result = await UserRepo.updateUser( query);
        return result;
    }
    async deleteUser(id: string){
        const userService: UserService = new UserService()
        const user = await userService.getUser(id);
        if(Object.keys(user).length == 0){
            return {
                status: false,
                msg: "User not found"
            }
        }
        const result = await UserRepo.deleteUser(id);
        return result;
    }
}

export default new UserService();