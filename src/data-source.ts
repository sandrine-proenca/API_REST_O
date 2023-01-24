import "reflect-metadata";
import { DataSource } from "typeorm";
import { Command } from "./entity/Command";
import { Menu } from "./entity/Menu";
import { Restaurant } from "./entity/Restaurant";
import { User } from "./entity/user";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
//require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ['src/entities/*/.entity.ts']
})

