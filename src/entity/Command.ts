import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { Menu } from "./Menu"
import { User } from "./User"
import { Restaurant } from "./Restaurant"


@Entity()
export class Command extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => Menu, (menu) => menu.command, { nullable: false })
    menu: Menu


    @ManyToOne(() => Restaurant, (restaurant) => restaurant.command,{ nullable: false })
    restaurant: Restaurant


    @ManyToOne(() => User, (user) => user.command, { nullable: false })
    user: User

}