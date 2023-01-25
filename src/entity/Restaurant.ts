import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Commande } from "./Command"

@Entity()
export class Restaurant extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    town: string

    @OneToMany(() => Commande, (commande) => commande.restaurant)
    commandes: Commande []
}