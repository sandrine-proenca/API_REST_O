import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Command } from "./Command"


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    password: number

    @Column({default:false})
    admin: boolean

    @OneToMany(() => Command, (command) => command.user)
    command: Command

}
