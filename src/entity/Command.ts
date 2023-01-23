import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { Menu } from "./menu"
import { User } from "./user"
import { Restaurant } from "./restaurant"

export class Command extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => Menu, (menu) => menu.command)
    menu: Menu


    @ManyToOne(() => Restaurant, (restaurant) => restaurant.command)
    restaurant: Restaurant


    @ManyToOne(() => User, (user) => user.command)
    user: User

}