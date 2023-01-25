
import { Menu } from "./Menu"
import { Users } from "./User"
import { Restaurant } from "./Restaurant"
import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"


@Entity()
export class Commande extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => Users, (user) => user.commandes, { nullable: false })
    user: Users


    @ManyToOne(() => Menu, (menu) => menu.commandes, { nullable: false })
    menu: Menu


    @ManyToOne(() => Restaurant, (restaurant) => restaurant.commandes, { nullable: false })
    restaurant: Restaurant




}