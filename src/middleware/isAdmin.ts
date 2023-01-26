import { NextFunction, Request, Response } from "express";


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

    if (req.body.admin) {
        console.log("test2", req.body.admin);

        next()
    }
    else {
        res.status(401).json({
            status: "FAILED",
            message: "Obligation to be an admin",
        });
    }


}

