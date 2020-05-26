import { Router } from "https://deno.land/x/oak/mod.ts"
import beerController from "./controllers/beerController.ts"


const router = new Router();
router.get('/', ({response}: {response:any}) =>{
    response.body = {
        statu: true
    }
})
.post('/beers', beerController.addBeer)
.get('/beers/:id', beerController.getBeer)
.put('/beers/:id', beerController.updateBeer)
.delete('/beers/:id', beerController.deleteBeer)
.get('/beers', beerController.getBeers);

export {router}