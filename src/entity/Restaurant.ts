import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import { Command } from "./Command"

@Entity()
export class Restaurant extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    town: string

    @OneToMany(() => Command, (command) => command.restaurant)
    command: Command
}