import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Commande } from "./Command"


@Entity()
export class Menu extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    price: string

    @OneToMany(() => Commande, (command) => command.menu)
    commandes: Commande[]
}