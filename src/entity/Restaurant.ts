import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Restaurant extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    town: string
}