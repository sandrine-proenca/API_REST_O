import express = require('express');
import { authenticateJWT } from '../middleware/auth';
import { RestaurantController } from '../controllers/restaurantController';
import { isAdmin } from '../middleware/isAdmin';

export const restaurantRouter = express.Router()

const restaurantController = new RestaurantController()

restaurantRouter.post('/', authenticateJWT, isAdmin, restaurantController.postRestaurant)

restaurantRouter.get('/', restaurantController.getRestaurant)

restaurantRouter.get('/:id', restaurantController.getOneRestaurant)

restaurantRouter.put('/', authenticateJWT, isAdmin, restaurantController.putOneRestaurant)

restaurantRouter.delete('/', authenticateJWT, isAdmin, restaurantController.deleteOneRestaurant)
