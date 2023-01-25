import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Commande } from "./Command"


@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({default:false})
    admin: boolean

    @OneToMany(() => Commande, (commande) => commande.user)
    commandes: Commande []

}
