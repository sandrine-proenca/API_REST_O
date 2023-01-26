import express = require('express');
import { authenticateJWT } from '../middleware/auth';
import { RestaurantController } from '../controllers/restaurantController';
import { isAdmin } from '../middleware/isAdmin';

export const restaurantRouter = express.Router()

/**
 * appel de la class RestaurantController
 */
const restaurantController = new RestaurantController()

/**
 * créer un restaurant par un admin 
 */
restaurantRouter.post('/', authenticateJWT, isAdmin, restaurantController.postRestaurant)

/**
 * récupération de tous les restaurants par un user 
*/
restaurantRouter.get('/', restaurantController.getRestaurant)

/**
 * récupération d'un restaurant par son id par un user
 */
restaurantRouter.get('/:id', restaurantController.getOneRestaurant)

/**
 * modification d'un restaurant par son id par un admin 
 */
restaurantRouter.put('/', authenticateJWT, isAdmin, restaurantController.putOneRestaurant)

/**
 * suppression d'un restaurant par son id par un admin 
 */
restaurantRouter.delete('/', authenticateJWT, isAdmin, restaurantController.deleteOneRestaurant)
