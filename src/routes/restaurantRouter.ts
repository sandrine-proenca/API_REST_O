import express = require('express');
import { authenticateJWT } from '../middleware/auth';
import { RestaurantController } from '../controllers/restaurantController';
import { isAdmin } from '../middleware/isAdmin';

export const restaurantRouter = express.Router()

/**
 * appel de la class RestaurantController
 */
const restaurantController = new RestaurantController()

restaurantRouter.post('/', authenticateJWT, isAdmin, restaurantController.postRestaurant)

/**récupération de tous les restaurants par un user */
restaurantRouter.get('/', restaurantController.getRestaurant)

restaurantRouter.get('/:id', restaurantController.getOneRestaurant)

restaurantRouter.put('/', authenticateJWT, isAdmin, restaurantController.putOneRestaurant)

restaurantRouter.delete('/', authenticateJWT, isAdmin, restaurantController.deleteOneRestaurant)
