import "reflect-metadata"
import { DataSource } from "typeorm"
import { Menu } from "./entity/Menu"
import { Restaurant } from "./entity/Restaurant"
import { Users } from "./entity/User"
require('dotenv').config()
import { Commande } from "./entity/Command"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Users,Commande,Menu,Restaurant]
  /*   migrations: [],
    subscribers: [], */
})

