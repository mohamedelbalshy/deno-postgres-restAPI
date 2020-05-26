import { Router } from "https://deno.land/x/oak/mod.ts"
import beerController from "./controllers/beerController.ts";
import userController from "./controllers/userController.ts"


const router = new Router({prefix: "/api"});



//Beer routes
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


// User routes

router.get("/users", userController.getUsers)
.get("/users/:id", userController.getUser)
.post("/users", userController.addUser)
.put("/users/:id", userController.updateUser)
.delete("/users/:id", userController.deleteUser);


export {router}