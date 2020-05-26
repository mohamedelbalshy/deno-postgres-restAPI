# deno-postgres-restAPI

`simple CRUD using deno programming language and postgres database`
you should have `config.ts` file
for example it should contains: ```
const env = Deno.env;
const APP_HOST = env.get("APP_HOST") ||"localhost";

const APP_PORT = env.get("APP_PORT") || "5000";

const DB_USERNAME = env.get("DB_USERNAME") || "postgres";

const DB_PASSWORD = env.get("DB_PASSWORD") || "1234";

const DB_NAME = env.get("DB_NAME") || "restAPI";

const DB_PORT  =env.get("DB_PORT") || "5432"

const DB_HOST = env.get("DB_HOST") || "localhost"



export {APP_HOST, APP_PORT, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, DB_HOST}
```
