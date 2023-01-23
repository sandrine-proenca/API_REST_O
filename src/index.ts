import { AppDataSource } from "./data-source"
import { User } from "API_REST_O/src/entity/user"

AppDataSource.initialize().then(async () => {



}).catch(error => console.log(error))


