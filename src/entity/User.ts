import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    password: number

    @Column()
    admin: boolean

}
