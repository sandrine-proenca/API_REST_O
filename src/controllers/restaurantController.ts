import { Request, Response } from "express";
import { RestaurantService } from "src/services/restaurantService";

/**
 * Appel de Class permetant la gestion de requètes sql pour les restaurants
 */
const restaurantService = new RestaurantService()

/**
 * Class qui fait le contrôle préalable des données pour les restaurants
 * **.postRestaurant**: contrôle préalable de l'ajout du nouveau user dans la BDD par un admin
 * **.getRestaurant**: contrôle préalable de la récupérationde tous les restaurants dans la BDD
 * **.getOneRestaurant**: contrôle préalable de la récupérationde d'un restaurant dans la BDD
 * **.putOneRestaurant**: contrôle préalable de la récupération d'un restaurant dans la BDD puis modification de la ville par l'admin et enregistrement dans la BDD
 * **.deleteOneRestaurant**: contrôle préalable de la récupérationde d'un restaurant dans la BDD puis suppression par l'admin et enregistrement dans la BDD
 */
export class RestaurantController
{

    /**
     * contrôle préalable de l'ajout du nouveau restaurant dans la BDD par un admin
     */
    async postRestaurant(req: Request, res: Response)
    {

        const town: string = req.body.town
        const admin: boolean = req.body.admin
        if (town === undefined || typeof town !== typeof String())
        {
            res.status(404).json({
                status: "FAILED",
                message: "Obligation to have a restaurant in the right format",
                data: undefined
            });
            return;
        }

        if (!admin)
        {
            res.status(404).json({
                status: "FAILED",
                message: "Obligation to be an admin",
                data: undefined
            });
            return;
        }

        try
        {
            const data = await restaurantService.postOneRestaurant(town)

            res.status(201).json(
                {
                    status: "OK",
                    message: "Successfully added restaurant",
                    data: data
                }
            )
        }
        catch (err)
        {
            res.status(500).json({
                status: "FAILED",
                message: "Internal Server Error",
                data: undefined
            })
            console.log(err);
        }
    }

    /**
     * contrôle préalable de la récupérationde tous les restaurants dans la BDD
     */
    async getRestaurant(req: Request, res: Response)
    {
        try
        {
            const restaurant = await restaurantService.getAllRestaurant()

            if (restaurant === undefined)
            {
                res.status(404).json({
                    status: "FAILED",
                    message: "No restaurants exist",
                    data: undefined
                })
                return;
            }

            res.status(200).json(
                {
                    status: "OK",
                    message: "List of restaurants",
                    data: restaurant
                })
        }
        catch (err)
        {
            res.status(500).json({
                status: "FAILED",
                message: "Internal Server Error",
                data: undefined
            })
            console.log(err);
        }
    }

    /**
     * contrôle préalable de la récupérationde d'un restaurant dans la BDD
     */
    async getOneRestaurant(req: Request, res: Response)
    {

        const restaurantId: number = parseInt(req.params.id)

        if (Number.isNaN(restaurantId))
        {
            res.status(400).json({
                status: "FAILED",
                message: "The request misunderstood by the server / incorrect syntax",
                data: undefined
            });
        }
        try
        {
            const restaurant = await restaurantService.getRestaurantById(restaurantId)

            if (restaurant === undefined)
            {
                res.status(404).json({
                    status: "FAILED",
                    message: "The restaurant does not exist",
                    data: undefined
                })
                return;
            }
            res.status(200).json(
                {
                    status: "OK",
                    message: "this restaurant exist",
                    data: restaurant
                })
        }
        catch (err)
        {
            res.status(500).json({
                status: "FAILED",
                message: "Internal Server Error",
                data: undefined
            })
            console.log(err);
        }
    }

    /**
     * contrôle préalable de la récupération d'un restaurant dans la BDD puis modification de la ville par l'admin et enregistrement dans la BDD
     */
    async putOneRestaurant(req: Request, res: Response)
    {
        const admin: boolean = req.body.admin
        const town: string = req.body.town
        const restaurantId: number = parseInt(req.body.id)

        if (Number.isNaN(restaurantId))
        {
            res.status(400).json({
                status: "FAILED",
                message: "The request misunderstood by the server / incorrect syntax",
                data: undefined
            });
        }

        if (town === undefined || typeof town !== typeof String())
        {
            res.status(404).json({
                status: "FAILED",
                message: "Obligation to have a restaurant in the right format",
                data: undefined
            });
            return;
        }
        try
        {
            const checkRestaurant = await restaurantService.getRestaurantById(restaurantId)

            if (checkRestaurant === undefined)
            {
                res.status(404).json({
                    status: "FAILED",
                    message: "The restaurant does not exist",
                    data: undefined
                });
                return;
            }

            if (checkRestaurant && !admin)
            {
                res.status(404).json({
                    status: "FAILED",
                    message: "Obligation to be an admin",
                    data: undefined
                });
                return;
            }

            const restaurant = await restaurantService.putRestaurantById(town, restaurantId)

            res.status(201).json({
                status: "OK",
                message: "The restaurant has been modified",
                data: restaurant
            });
        }
        catch (err)
        {
            res.status(500).json({
                status: "FAILED",
                message: "Internal Server Error",
                data: undefined
            })
            console.log(err);
        }
    }

    /**
     * contrôle préalable de la récupérationde d'un restaurant dans la BDD puis suppression par l'admin et enregistrement dans la BDD
     */
    async deleteOneRestaurant(req:Request, res:Response){

        const admin: boolean = req.body.admin
        const restaurantId: number = parseInt(req.body.id)

        if (Number.isNaN(restaurantId))
        {
            res.status(400).json({
                status: "FAILED",
                message: "The request misunderstood by the server / incorrect syntax",
                data: undefined
            });
        }

        try
        {
            const checkRestaurant = await restaurantService.getRestaurantById(restaurantId)

            if (checkRestaurant === undefined)
            {
                res.status(404).json({
                    status: "FAILED",
                    message: "The restaurant does not exist",
                    data: undefined
                });
                return;
            }

            if (checkRestaurant && !admin)
            {
                res.status(404).json({
                    status: "FAILED",
                    message: "Obligation to be an admin",
                    data: undefined
                });
                return;
            }

            const restaurant = await restaurantService.deleteRestaurant(restaurantId)

            res.status(201).json({
                status: "OK",
                message: "The restaurant has been removed",
                data: restaurant
            });
        }
        catch (err)
        {
            res.status(500).json({
                status: "FAILED",
                message: "Internal Server Error",
                data: undefined
            })
            console.log(err);
        }
    }
}
