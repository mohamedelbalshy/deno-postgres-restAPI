import { User } from "../types.ts";
import UserService  from "../services/userService.ts";

class UserController{
    async addUser({request, response}: {request: any, response: any}){

        await UserService.addUser(request);
    }
    async getUser({request, response, params}: {request: any, response: any, params: {id: string}}){
        
        const id = params.id;
        await UserService.getUser(id);
    }
}

export default new UserController();