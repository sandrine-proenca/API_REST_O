import { User } from "../entity/User"



/**
 * Class permetant la gestion de requètes sql pour les users
 * **.addUser()**: ajoute un nouveau user
 * **.getUserByEmail**: récupère un user avec son email
 */
export class UserService {


    /**
     * ajoute un nouveau user dans la BDD
     */
    async addUser(email: string, hash: string): Promise<User | undefined> {
        const user = new User()

        user.email = email
        user.password = hash

        await user.save()
        user.password = ''

        if (user) {
            return user
        }
        return undefined
    }



    /**
     * récupère un user avec son email dans la BDD
     */
    async getUserByEmail(email: string, withPassword: boolean = false): Promise<User | undefined> {


        const user = await User.findOne(
            {
                where: {
                    email: email
                },

                select: {
                    id: true,
                    email: true,
                    admin: true,
                    password: withPassword
                }
            }
        )

        if (user) {
            return user
        }
        return undefined
    }
}
