import { Request, Response } from "express";
import { MenuService } from "../services/menuService";

const menuService = new MenuService()

/**
 * Class permettant le contrôle des données entrantes pour les requête menus
 * * **.getMenus()** : Contrôle préalable à la récupération de tous les menus
 * * **.getMenuId()** : Contrôle préalable à la récupération d'un menu grâce à son id
 * * **.postMenu()** : Contrôle préalable à l'ajout d'un nouveau menu
 * * **.updtateMenu()** : Contrôle préalable à la modification d'un menu
 * * **.deleteMenu()** : Contrôle préalable à la suppression d'un menu
 */
export class MenuController {


    /**
        * Contrôle préalable à la récupération de tous les menus
        */
    async getMenus(req: Request, res: Response) {
        try {
            const data = await menuService.getAllMenus();
            res.status(200).json(
                {
                    status: "success",
                    message: "Liste des menus",
                    data: data
                }
            )
        }
        catch (err: any) {
            res.status(500).json(
                {
                    status: "Fail",
                    message: "erreur serveur"
                }
            )
            console.log(err.stack)
        }
    }



    /**
        * Contrôle préalable à la récupération d'un menu grâce à son id
        */
    async getMenuId(req: Request, res: Response) {
        const menuId = parseInt(req.params.id);
        if (!Number.isNaN(menuId)) {
            try {
                const data = await menuService.getMenuById(menuId)

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
                            message: "l'ID ne correspond a aucun menu"
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
     * Controle prealable a l'ajout d'un nouveau menu
     */
    async postMenu(req: Request, res: Response) {
        const name: string = req.body.name
        const price: string = req.body.price
        const admin: boolean = req.body.admin

        if (name && price && admin) {
            try {
                const data = await menuService.postMenu(name, price)
                res.status(201).json(
                    {
                        status: "success",
                        message: "menu ajoute avec succes",
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
                    message: "nom, prix ou droits admin manquant"
                }
            )
        }
    }


    /**
     *Contrôle préalable à la suppression d'un menu
      */
    async deleteMenu(req: Request, res: Response) {
        const menuId = parseInt(req.params.id)
        const userId: number = req.body.userId
        const admin: boolean = req.body.admin

        if (!Number.isNaN(menuId)) {
            try {
                const menuData = await menuService.getMenuById(menuId)

                if (!menuData) {
                    res.status(404).json(
                        {
                            status: "fail",
                            message: "l'ID ne correspond a aucun menu"
                        }
                    )
                }
                else if (userId !== menuData.id && !admin) {
                    res.status(400).json(
                        {
                            status: "fail",
                            message: "action non-autorisee"
                        }
                    )
                }
                else {
                    const data = await menuService.deleteMenu(menuId)
                    if (data) {
                        res.status(200).json(
                            {
                                status: "success",
                                message: "article supprime"
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
     *Contrôle préalable à la modification d'un menu
      */
    async updateMenu(req: Request, res: Response) {
        const menuId = parseInt(req.params.id)
        const updateName = req.body.name
        const updatePrice = req.body.price
        const userId = req.user
        const admin = req.body.admin


        if (!Number.isNaN(menuId)) {
            if (updateName && updatePrice !== undefined) {
                try {
                    const menuData = await menuService.updateMenu(updateName, updatePrice, menuId)
                    if (!menuData) {
                        res.status(404).json(
                            {
                                status: "fail",
                                message: "necessite un nombre valable en ID"
                            }
                        )
                    }
                    else if (userId !== menuData && !admin) {
                        res.status(404).json(
                            {
                                status: "fail",
                                message: "modification non-autorisee"
                            }
                        )
                    }
                    else {
                        res.status(201).json(
                            {
                                status: "success:",
                                message: "donnees modifiees",
                                data: menuData
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
}