import beerRepo from "../repositories/beerRepo.ts";
import {Beer} from "../types.ts"

export const createBeer = async (beerData: Beer)=>{
    const newBeer:Beer = {
        name: beerData.name,
        brand: beerData.brand,
        isPremium: beerData.isPremium,
        createdAt: new Date()
    }
    await beerRepo.create(newBeer);

    return newBeer;
}

export const getBeers = async () =>{
    const beers : any = await beerRepo.getBeers();
    const result: Beer[] = [];
    
    beers.rows.map((beer: []) => {
        const obj:any = { };
        beers.rowDescription.columns.map((el: {name: string}, i: number) =>{
            obj[el.name] = beer[i];
        });
        result.push(obj);
    })
    return result;
}

export const updateBeer = async (id: string, updateData: any) =>{
    const newUpdateBeer = {
        ...updateData.name && {name: updateData.name},
        ...updateData.brand && {brand: updateData.brand},
        ...updateData.isPremium !== undefined && {isPremium: updateData.isPremium}
    }
    console.log(newUpdateBeer);
    await beerRepo.updateBeer(id, newUpdateBeer);
    return newUpdateBeer;
}

export const getBeer = async (id: string) =>{
    const beers: any = await beerRepo.selectById(id);
    let result: any | Beer = {};

    beers.rows.map((beer:[]) =>{
        beers.rowDescription.columns.map((el: {name: string}, i: number) =>{
            result[el.name] = beer[i];
        })
    });

    return result;
}

export const deleteBeer = async (id: string) =>{
    const beer = await getBeer(id);
    if(Object.keys(beer).length == 0){
        return {
            status: false,
            msg: "Beer not found"
        }
    }
    const result = await beerRepo.deleteBeer(id);
    return result;
}