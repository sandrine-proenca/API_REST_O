import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user"

export class UserService
{

    async addUser(email: string, hash: string): Promise<User | undefined>
    {
        const user = new User()
        user.email = email
        user.password = hash
        await user.save()
        console.log('------- service --------- test 1 ---------------', AppDataSource.options.entities);
        //////////////////////////////

        
        
        return user;
    }

    async getUserByEmail(email: string, hash: string): Promise <User | undefined> {

        const user = new User()
        user.email = email
        user.password = hash

        await User.find()

        return user
    }
    
    /* static findByEmail(email: string, password: string){
        return this.createQueryBuilder("user")
            .where("user.email = :email", {email})
            .andWhere("user.password = :password", {password})
            .getMany()
    } */
}
