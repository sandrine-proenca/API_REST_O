import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Commande } from "./Command"


@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, unique: true })
    email: string

    @Column({ nullable: false, select: false })   // le select permet ou nom de l'affichage
    password: string

    @Column({ default: false })
    admin: boolean

    @OneToMany(() => Commande, (command) => command.user)
    commandes: Commande[]

}
