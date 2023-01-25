import { Request, Response } from "express";
import { UserService } from "../services/userService";
import * as bcrypt from 'bcrypt';
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";


const userService = new UserService();

export class UserController
{

    async register(req: Request, res: Response)
    {

        const { email, password } = req.body
        console.log('------ controller ---------- test 111 ----- req.body ----------',req.body);

        /* if (email) {
            res.status(400).json({
                status: "FAILED",
                message: "This email already exists, change it",
                data: undefined
            });
            console.log('------ controller ---------- test 222 ---- email déjà existant -----------');
            return;
        }; */

        /* if (!email || !password)
        {
            res.status(400).json({
                status: "FAILED",
                message: "error in email or password",
                data: undefined
            });
            console.log('------ controller ---------- test 333 ----- email ou password incorect ----------');
            return;
        } */
        bcrypt.hash(password, 10, async (err, hash) =>
        {

            try
            {
                console.log('------ controller ---------- test 444 ------ début du TRY ---------', userService);
//////////////////////////////////////////

                const user = await userService.addUser(email, hash);
                console.log('------ controller ---------- test 555 --- appel du addUser ------------');


                res.status(201).json({
                    status: "OK",
                    message: `The name: ${email} and the associated password have been successfully created.`,
                    data: user
                });
            } catch (err)
            {
                res.status(500).json({
                    status: "FAILED",
                    message: "Internal Server Error",
                    data: undefined
                })
                console.log(err);

            }
        })
    }
}
