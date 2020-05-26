import { Client } from "https://deno.land/x/postgres/mod.ts"
import {DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, DB_HOST} from "../config.ts"

const port :number = parseInt(DB_PORT);
 

class Database {
    private client:Client = new Client({
        user: DB_USERNAME,
        database: DB_NAME,
        hostname: DB_HOST,
        password: DB_PASSWORD,
        port: port
    });

    constructor(){
        this.connect();
    }
    public getClient(){
        return this.client;
    }
    

    async connect(){
        this.client.connect();
    }

}

export default new Database().getClient();