import express = require('express');
import { RestaurantController } from 'src/controllers/restaurantController';

export const restaurantRouter = express.Router()

const restaurantController = new RestaurantController()

restaurantRouter.post('/', restaurantController.postRestaurant)

restaurantRouter.get('/', restaurantController.getRestaurant)

restaurantRouter.get('/:id', restaurantController.getOneRestaurant)

restaurantRouter.put('/:id', restaurantController.putOneRestaurant)

restaurantRouter.delete('/:id', restaurantController.deleteOneRestaurant)
