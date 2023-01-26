import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";




const accessTokenSecret = process.env.TOKEN_SECRET

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        if (accessTokenSecret) {
            jwt.verify(token, accessTokenSecret, (err: any, token) => {
                if (err) {
                    return res.sendStatus(403);
                }
                if (token) {
                    req.body.userId = parseInt((token as jwt.JwtPayload).userId);
                    req.body.admin = (token as jwt.JwtPayload).admin;

                    next();
                }
            });
        }
    } else {
        res.sendStatus(401);
    }
};