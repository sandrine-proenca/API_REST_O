import { User } from "../entity/user"

export class UserService
{

    async addUsers(email: string, hash: string): Promise<User | undefined>
    {
        const user = new User()
        user.email = email
        user.password = hash

        await user.save()

        return user
    }

    async getUserByEmail(email: string, hash: string): Promise <User | undefined> {

        const user = new User()
        user.email = email
        user.password = hash

        await User.find()

        return user
    }
}
