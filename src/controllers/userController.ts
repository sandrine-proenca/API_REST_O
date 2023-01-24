import { Request, Response } from "express";
import { UserService } from "../services/userService";
import * as bcrypt from 'bcrypt';


const UserService = new UserService();

export class UserController {

    async register (req: Request, res: Response) {

        const {email, password} = req.body

        if (!email || !password){
            res.status(400).json({
                status: "FAILED",
                message: "error in email or password",
                data: undefined
            });
            return;
        }
        
        const user = await userService.getUserByName(email);

        if (user) {
            res.status(400).json({
                status: "FAILED",
                message: "This name already exists, change it",
                data: undefined
            });
            return;
        };

        bcrypt.hash(password, 10, async(err: any, hash: string) => {
            try {
                const user = await userService.addUser(email, hash);
                res.status(201).json({
                    status: "OK",
                    message: `The name: ${email} and the associated password have been successfully created.`,
                    data: user
                });
            } catch (err) {
                res.status(500).json({
                    status: "FAILED",
                    message: "Internal Server Error",
                    data: undefined
                })
            }
        })
    }
}