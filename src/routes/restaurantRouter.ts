import express from "express";
import { RestaurantController } from "src/controllers/restaurantController";


export const restaurantRouter = express.Router();

const restaurantController = new RestaurantController();