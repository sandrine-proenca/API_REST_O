import { Restaurant } from "../entity/Restaurant";


export class RestaurantService{

    async addRestaurant (town: string): Promise<Restaurant [] | undefined>{

        const restaurant = new Restaurant()
        restaurant.town = town

        await restaurant.save()
        console.log(restaurant.save());
        

        return restaurant [0]
    }

    async getAllRestaurant (town: string): Promise <Restaurant | undefined>{

        const restaurant = new Restaurant()
        restaurant.town = town

        await Restaurant.find()
        console.log(Restaurant.find());
        

        return restaurant 
    }

    async geRestaurantById (id: number): Promise <Restaurant [] | undefined>{

        const restaurant = new Restaurant()
        restaurant.id = id

        await Restaurant.findBy({id})
        console.log(Restaurant.findBy({id}));

        return restaurant[0]
        
    }

    async putRestaurant (id: number, town: string): Promise <Restaurant | undefined> {

        const restaurant = new Restaurant()
        restaurant.id = id
        restaurant.town = town

        await Restaurant.update({id, town})
        console.log(Restaurant.update());

        return restaurant
    }
}