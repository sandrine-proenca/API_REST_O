import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import { Users } from "../entity/user"

export class UserService
{

    async addUser(email: string, hash: string): Promise<Users | undefined>
    {
        const user = new Users()
        user.email = email
        user.password = hash
        await user.save()
        console.log('------- service --------- test 1 ---------------', AppDataSource.options.entities);
        //////////////////////////////

        
        
        return user;
    }

    async getUserByEmail(email: string, hash: string): Promise <Users | undefined> {

        const user = new Users()
        user.email = email
        user.password = hash

        await Users.find()

        return user
    }
    
    /* static findByEmail(email: string, password: string){
        return this.createQueryBuilder("user")
            .where("user.email = :email", {email})
            .andWhere("user.password = :password", {password})
            .getMany()
    } */
}
