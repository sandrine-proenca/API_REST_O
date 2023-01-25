import { Restaurant } from "src/entity/Restaurant"

/**
 * Class permetant la gestion de requètes sql pour les restaurants
 * **.postRestaurant**: création du restaurant dans la BDD
 * **.getAllRestaurant**: récupération de tous les restaurants dans la BDD
 * **.getRestaurantById**:récupération d'un restaurant par son id dans la BDD
 * **.putRestaurantById**:récupération d'un restaurant par son id dans la BDD et chachement  de la donnée 'town' avec sauvegarde dans la BDD
     * **.deleteRestaurant**: récupération d'un restaurant par son id dans la BDD et suppression dans la BDD
 */
export class RestaurantService
{
    /**
     * création du restaurant dans la BDD
     */
    async postRestaurant(town: string)
    {
        const restaurant = new Restaurant()
        restaurant.town = town;

        await restaurant.save()

        return restaurant
    }
    /**
     * récupération de tous les restaurants dans la BDD
     */
    async getAllRestaurant(): Promise <Restaurant | any>
    {
        const restaurant = await Restaurant.find()

        return restaurant
    }
/**
 * récupération d'un restaurant par son id dans la BDD
 */
    async getRestaurantById(id: number): Promise <Restaurant | any>
    {
        const restaurant = await Restaurant.findBy({id: id})
        console.log(restaurant)
        return restaurant[0]
        
    }
    /**
     * récupération d'un restaurant par son id dans la BDD et
     * chachement  de la donnée 'town' avec sauvegarde dans la BDD
     */
    async putRestaurantById(newTown: string, id: number): Promise <Restaurant | any>{
        const restaurant = await this.getRestaurantById(id)
        restaurant.town = newTown

        Restaurant.save(restaurant)

        return restaurant
    }
    /**
     * récupération d'un restaurant par son id dans la BDD et
     * suppression dans la BDD
     */
    async deleteRestaurant(id: number): Promise <Restaurant | any>
    {
        const restaurant = await this.getRestaurantById(id)

        await restaurant.remove()

        return restaurant
    }
}