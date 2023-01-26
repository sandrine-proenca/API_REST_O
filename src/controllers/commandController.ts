import { Request, Response } from "express";
import { commandService } from "../services/commandService";



const commandeService = new commandService()



/**
 * Class permettant le contrôle des données entrantes pour les requête commandes
 * * **.getCommandes()** : Contrôle préalable à la récupération de toutes les commandes
 * * **.getCommandeId()** : Contrôle préalable à la récupération d'une commande grâce à son id
 * * **.postCommande()** : Contrôle préalable à l'ajout d'une nouvelle commande
 * * **.updtateCommande()** : Contrôle préalable à la modification d'une commande
 * * **.deleteCommande()** : Contrôle préalable à la suppression d'une commande
 */
export class CommandeController {


    /**
      * Contrôle préalable à la récupération de toutes les commandes
      */
    async getCommandes(req: Request, res: Response) {
        try {
            const data = await commandeService.getAllCommandes();
            res.status(200).json(
                {
                    status: "success",
                    message: "liste des commandes",
                    data: data
                }
            )
        }
        catch (err: any) {
            res.status(500).json(
                {
                    status: "fail",
                    message: "erreur serveur"
                }
            )
            console.log(err.stack);

        }
    }


    /**
       * Contrôle préalable à la récupération d'une commande grâce à son id
       */
    async getCommandeId(req: Request, res: Response) {
        const commandeId = parseInt(req.params.id);
        if (!Number.isNaN(commandeId)) {
            try {
                const data = await commandeService.getCommandeById(commandeId)
                if (data) {
                    res.status(200).json(
                        {
                            status: "success",
                            data: data
                        }
                    )
                }
                else {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "l'ID ne correspond a aucune commande"
                        }
                    )
                }
            }
            catch (err: any) {
                res.status(500).json(
                    {
                        status: "fail",
                        message: "erreur serveur"
                    }
                )
                console.log(err.stack);

            }
        }
        else {
            res.status(404).json(
                {
                    status: "fail",
                    message: "numero d'ID necessaire"
                }
            )
        }
    }


    /**
        * Controle prealable a l'ajout d'une nouvelle commande
        */
    async postCommande(req: Request, res: Response) {
        const restaurantId: number = req.body.restaurant
        const menuId: number = req.body.menu
        const userId: number = req.body.userId

        if (restaurantId && menuId && userId) {
            try {
                const data = await commandeService.postCommande(userId, menuId, restaurantId)

                res.status(201).json(
                    {
                        status: "success",
                        message: "commande ajoutee avec succes",
                        data: data
                    }
                )
            }
            catch (err: any) {
                res.status(500).json(
                    {
                        status: "fail",
                        message: "erreur serveur"
                    }
                )
                console.log(err.stack);

            }
        }
        else {
            res.status(400).json(
                {
                    status: "fail",
                    message: "menu ou restaurant manquant"
                }
            )
        }
    }

    /**
       *Contrôle préalable à la suppression d'une commande
        */
    async deleteCommande(req: Request, res: Response) {
        const commandId: number = parseInt(req.params.id)

        if (!Number.isNaN(commandId)) {
            try {
                const commandData = await commandeService.getCommandeById(commandId)

                if (!commandData) {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "l'ID ne correspond a aucune commande"
                        }
                    )

                }
                else {
                    const data = await commandeService.deleteCommande(commandId)
                    if (data) {
                        res.status(200).json(
                            {
                                status: "success",
                                message: "commande supprimee"
                            }
                        )
                    }
                }
            }
            catch (err: any) {
                res.status(500).json(
                    {
                        status: "fail",
                        message: "erreur serveur"
                    }
                )
                console.log(err.stack);

            }
        }
        else {
            res.status(404).json(
                {
                    status: "fail",
                    message: "ID necessaire"
                }
            )
        }


    }


    /**
          *Contrôle préalable à la modification d'une commande
           */
    async updateCommande(req: Request, res: Response) {
        const commandeId: number = parseInt(req.params.id);
        const restaurantId: number = parseInt(req.body.restaurant);
        const menuId: number = parseInt(req.body.menu);

        if (!Number.isNaN(commandeId)) {

            try {
                const commandData = await commandeService.updateCommande(commandeId, menuId, restaurantId)
                console.log("test1", commandData);

                if (!commandData) {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "necessite un nombre valable en ID"
                        }
                    )
                }
                else {
                    res.status(201).json(
                        {
                            status: "success",
                            message: "commande modifiee",
                            data:commandData
                        }
                    )
                }
            }
            catch (err: any) {
                console.log(err);
                
                res.status(500).json(
                    {
                        status: "fail",
                        message: "erreur serveur"
                    }
                )
            }
        }
        else {
            res.status(400).json(
                {
                    status: "fail",
                    message: "valeurs manquantes"
                }
            )
        }
    }
}


