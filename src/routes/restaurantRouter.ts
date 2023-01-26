import express = require('express');
import { RestaurantController } from '../controllers/restaurantController';

export const restaurantRouter = express.Router()

/**
 * appel de la class RestaurantController
 */
const restaurantController = new RestaurantController()

/**création d'un nouveau restaurant par un admin dans la BDD */
restaurantRouter.post('/', restaurantController.postRestaurant)

/**récupération de tous les restaurants par un user */
restaurantRouter.get('/', restaurantController.getRestaurant)

restaurantRouter.get('/:id', restaurantController.getOneRestaurant)

restaurantRouter.put('/:id', restaurantController.putOneRestaurant)

restaurantRouter.delete('/:id', restaurantController.deleteOneRestaurant)
