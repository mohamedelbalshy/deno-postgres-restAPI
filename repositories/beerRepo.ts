import client from "../db/database.ts"
import { Beer } from "../types.ts";
class BeerRepo {
    create(beer: Beer){
        return client.query(
            "INSERT INTO beers (name, brand, isPremium, createdAt) VALUES ($1, $2, $3, $4)",
            beer.name,
            beer.brand,
            beer.isPremium,
            beer.createdAt
          );
    }

    getBeers(){
        return client.query("SELECT * FROM beers ORDER BY id");
    }

    selectById(id: string){
        return client.query(`SELECT * FROM beers WHERE id = $1`, id);
    }

    updateBeer(id: string, updateBeerData: any){
        let query = `UPDATE beers `;
        let hasSet = false;
        if(updateBeerData.name){
            query += ` SET name = '${updateBeerData.name}'`;
            hasSet = true;
        }
        if(updateBeerData.brand){
            if(!hasSet){
                query += ` SET brand = '${updateBeerData.brand}'`
            }else{
                
                query += `,brand = '${updateBeerData.brand}'`
            }
        }
        if(updateBeerData.isPremium != undefined){
            if(!hasSet){
                query += ` SET isPremium = ${updateBeerData.isPremium}`
            }else{
                query += `,isPremium = ${updateBeerData.isPremium}`
            }
        }

        query += ` WHERE id = ${id}`;
        console.log(query);
        return client.query(query);
    }

    async deleteBeer(id: string){
        const result = await client.query(`DELETE FROM beers WHERE id = ${id}`);
        if(result.rowCount){
            return {
                status: true,
                msg: "Beer has been deleted"
            }
        }else{
            return {
                status: false,
                msg: "cannot delete beer"
            }
        }
        
    }
}

export default new BeerRepo();