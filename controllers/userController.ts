import UserService  from "../services/userService.ts";

class UserController{
    async addUser({request, response}: {request: any, response: any}){
        const body = await request.body();
        if(!body){
            response.status = 400;
            response.body = {
                status: false,
                msg: "no data sent in the body"
            }
        }
        let user = await UserService.addUser(body.value);
        
        // remove password from user
        const {password, ...newUser} = user; 

        response.body= {
            status: true,
            data: newUser
        }
        return;
    }
    async getUser({response, params}: {response: any, params: {id: string}}) {
        
        const id = params.id;
        if(!id ){
            response.status = 400;
            response.body = {
                status: false,
                msg: "id not sent or wrnog"
            }
            return
        }
        const user = await UserService.getUser(id);
        if(Object.keys(user).length !== 0){
            
            response.body = {
                status: true,
                data: user
            }
            return;
        }else{
            response.status = 404;
            response.body = {
                status: false,
                msg: "User not found"
            }
            return;
        }
        
    }

    async getUsers({response}: {response:any}){

        const users = await UserService.getUsers();

        response.status = 200;
        response.body = {
            status: true,
            data: users
        }
    }

    async updateUser({request, response, params}: {request: any, response: any, params: {id: string}}){
        const id = params.id;

        const body = await request.body();
        if(!body || !id ){
            response.status = 400;
            response.body = {
                status: true,
                msg: "Error id or user data not sent"
            }
            return;
        }
        const result = await UserService.updateUser(id, body.value);
        if(!result.status){
            response.status = 404;
        }
        response.body = result;
    }

    async deleteUser({params, response}: {params: {id: string}, response: any}){
        const id = params.id;
        if(!id){
            response.status = 400;
            response.body = {
                status: false,
                msg: 'id not found or wrong'
            }
        }
        const result = await UserService.deleteUser(id);
        if(!result.status){
            response.status = 404;
        }
        response.body = result;
    }
}

export default new UserController();