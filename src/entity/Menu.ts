import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Command } from "./Command"


@Entity()
export class Menu extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    price: string

    @OneToMany(() => Command, (command) => command.menu)
    command: Command[]
}