import express from "express";
import { MenuController } from "src/controllers/menuController";
import { authenticateJWT } from "src/middleware/auth";


/**
 * const permettant le routage des requètes concernant un article
 * * **.gets('/')** : route de récuperation de tout les menus  
 * * **.get('/:id)** : route de récuperation des menus par l'ID
 * * **.post('/')** : route de création de menu
 * * **.delete('/:id)** : route de suppression d'un menu
 * * **.put('/:id)** :  route de modification d'un menu
 */
export const menuRouter = express.Router();

const menuController = new MenuController();

/** 
 * route de récuperation de tout les menus */
menuRouter.get('/', authenticateJWT, menuController.getMenus);

/** 
 *route de récuperation des menus par l'ID */
menuRouter.get('/:id', authenticateJWT, menuController.getMenuId);

/** 
 * route de création d'un menu */
menuRouter.post('/', authenticateJWT, menuController.postMenu);

/** 
 * route de suppression d'un menu */
menuRouter.delete('/:id', authenticateJWT, menuController.deleteMenu);

/** 
 * route de modification d'un menu */
menuRouter.put('/:id', authenticateJWT, menuController.updateMenu);



