import { Restaurant } from "../entity/Restaurant";


export class RestaurantService{

    async addRestaurant (town: string): Promise<Restaurant | undefined>{
        const restaurant = new Restaurant()
        restaurant.town = town

        await restaurant.save()
        return restaurant
    }
}