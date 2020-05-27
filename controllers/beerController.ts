import {Beer} from "../types.ts"
import {createBeer, getBeers, getBeer, updateBeer, deleteBeer} from "../services/beerService.ts"

export class BeerController{
    async addBeer ( {request, response}: {request: any, response: any}){
        const body = await request.body();
        if(!body){
            response.status = 400;
            response.body = {
                status: false,
                msg: "No Data found!"
            }
        }else{
            const addedBeer = await createBeer(body.value);
    
            response.body = {
                status: true,
                data: addedBeer
            }
        }
    }

    async getBeers({response}:{response: any}){
        const beers:Beer[]= await getBeers();
    
        response.body = {
            status: true,
            data: beers
        }
    }

    async getBeer ({response, params}: {response: any, params: {id: string}}) {
        const id = params.id;
        const beer: Beer = await getBeer(id);
        
        if(Object.keys(beer).length !== 0){
            response.body ={
                status: true,
                data: beer
            }
        }else{
            response.status = 404;
            response.body = {
                status: false,
                msg: "Beer not found"
            }
        }
    
    }

    async updateBeer({params, request, response}: {params: {id: string}, request: any, response: any}){
        const id = params.id;
        const body = await request.body();
        if(!body){
            response.status = 400;
            response.body = {
                status: false,
                msg: "No Data found!"
            }
        }else{
            const updatedBeer = await updateBeer(id, body.value);
            response.body = {
                status: true,
                data: updatedBeer
            }
    
        }
    
    }

    async deleteBeer ({params, response}: {params: {id: string}, response: any}) {
        const id = params.id;
        const result = await deleteBeer(id);
        if(!result.status){
            response.status = 404;
        }
        response.body = result;
    }
}
export default new BeerController();