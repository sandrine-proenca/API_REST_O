import { Request, Response } from "express";
import { UserService } from "../services/userService";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

/**
 * Appel de Class permetant la gestion de requètes sql pour les users
 */
const userService = new UserService();
/**
 * Class qui fait le contrôle préalable des données pour les users
 * **.register()**: Contrôle préalable de la création d'un user
 * **.login()**: contrôle préalable de la récupération d'un user par son email
 */
export class UserController
{
    /**
     * Contrôle préalable de la création d'un user
     */
    async register(req: Request, res: Response)
    {

        const { email, password } = req.body
        //message d'erreur pour email ou password incorect
        if (!email || !password)
        {
            res.status(400).json({
                status: "FAILED",
                message: "error in email or password",
                data: undefined
            });
            return;
        }
        /**
         * vérification que le user n'existe pas déjà dans la BDD
         */
        const user = await userService.getUserByEmail(email, password);
        if (user){
            res.status(400).json({
                status: "FAILED.",
                message: "This user already exists, please change your name"
            });
            return;
        }
        /**hachage du mot de passe */
        bcrypt.hash(password, 10, async (err, hash) =>
        {
            try
            {
                /**
                 * ajout du nouveau user dans la BDD
                 */
                const user = await userService.addUser(email, hash);
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
    /**
     * contrôle préalable de la récupération d'un user par son email
     */
    async login(req: Request, res: Response)
    {
        const { email, password } = req.body;

        //vérifier que l'email existe et bien écrit
        if (email === undefined || typeof email !== typeof String())
        {
            res.status(403).json({
                status: "FAILED",
                message: "This email is invalid",
                data: undefined
            })
            return;
        }

        //vérifier  que le password existe et bien écrit
        if (password === undefined || typeof password !== typeof String())
        {
            res.status(403).json({
                status: "FAILED.",
                message: "This password is invalid",
                data: undefined
            })
            return;
        }
        try
        {
            /**
             * récupération du user s'il existe dans la BDD
             */
            const user = await userService.getUserByEmail(email, password);

            if (user)
            {
                /**hachage du password donné pour comparaison avec celui déjà enregistré */
                bcrypt.compare(password, user.password, function (err, result)
                {
                    const accessToken = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET!);

                    if (result === true)
                    {
                        res.status(200).json({
                            status: "OK.",
                            message: "This password is valid",
                            data: accessToken
                        })
                    }
                    else
                    {
                        res.status(403).json({
                            status: "FAILED.",
                            message: "This password is invalid",
                            data: undefined
                        });
                    }
                })
            }
            else {
                res.status(403).json({
                    status: "FAILED.",
                    message: "This user don't exist",
                    data: undefined
                });
            }
        }
        catch(err){
            res.status(500).json({
                status: "FAILED.",
                message: "Internal Server Error"
            })
        }
    }
}
