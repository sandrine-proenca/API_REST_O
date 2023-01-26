import { Request, Response } from "express";
import { Commande } from "src/entity/Command";
import { Menu } from "src/entity/Menu";
import { Restaurant } from "src/entity/Restaurant";
import { User } from "src/entity/User";
import { postCommandeInput, postCommandOutput } from "src/interface/postCommand.interface";
import { commandService } from "src/services/commandService";



const commandeService = new commandService(Commande,User,Restaurant,Menu)



/**
 * Class permettant le contrôle des données entrantes pour les requête commandes
 * * **.getCommandes()** : Contrôle préalable à la récupération de toutes les commandes
 * * **.getCommandeId()** : Contrôle préalable à la récupération d'une commande grâce à son id
 * * **.postCommande()** : Contrôle préalable à l'ajout d'une nouvelle commande
 * * **.updtateCommande()** : Contrôle préalable à la modification d'une commande
 * * **.deleteCommande()** : Contrôle préalable à la suppression d'une commande
 */
export class MenuController {


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
        const { menuId, restaurantId, userId }: postCommandeInput = req.body

        if (restaurantId && menuId) {
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
}