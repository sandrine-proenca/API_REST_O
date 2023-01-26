import express = require('express');
import { isAdmin } from "../middleware/isAdmin";
import { MenuController } from "../controllers/menuController";
import { authenticateJWT } from "../middleware/auth";


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
menuRouter.get('/', menuController.getMenus);

/** 
 *route de récuperation des menus par l'ID */
menuRouter.get('/:id', menuController.getMenuId);

/** 
 * route de création d'un menu */
menuRouter.post('/', authenticateJWT,isAdmin, menuController.postMenu);

/** 
 * route de suppression d'un menu */
menuRouter.delete('/:id', authenticateJWT,isAdmin, menuController.deleteMenu);

/** 
 * route de modification d'un menu */
menuRouter.put('/:id', authenticateJWT,isAdmin, menuController.updateMenu);



