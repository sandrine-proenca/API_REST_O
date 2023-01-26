import { Commande } from "src/entity/Command";
import { Menu } from "src/entity/Menu";
import { Restaurant } from "src/entity/Restaurant";
import { User } from "src/entity/User";




/**
 * Class permettant la gestion des requètes SQL pour les commandes
 * * **.getAllCommandes()** : recupère toutes les commandes de la BDD
 * * **.getCommandeById()** : recupère une commande par son ID de la BDD
 * * **.postCommande()** : ajoute une nouvelle commande à la BDD
 * * **.updateCommande()** : modifie une commande par son ID de la BDD
 * * **.deleteCommande()** : supprime une commande de la BDD
 */
export class commandService {


    /**
   * recupère toutes les commandes de la BDD 
   */
    async getAllCommandes(): Promise<Commande[] | undefined> {
        const commandes = Commande.find();

        return commandes
    }


    /**
        * recupère une commande par son id de la BDD
        */
    async getCommandeById(id: number): Promise<Commande | null> {

        const commande = await Commande.findOne(
            {

                where: { id: id },
                relations: {
                    user: true,
                    restaurant: true,
                    menu: true
                }
            }
        )
        return commande
    }

    /**
       * ajoute une nouvelle commande à la BDD
       */
    async postCommande(userId: number, menuId: number, restaurantId: number): Promise<Commande | undefined> {
        const commande = new Commande()

        const user = await User.findOneBy({ id: userId })
        const menu = await Menu.findOneBy({ id: menuId })
        const restaurant = await Restaurant.findOneBy({ id: restaurantId })

        if (user && menu && restaurant) {

            commande.user = user
            commande.menu = menu
            commande.restaurant = restaurant

            await commande.save()

            return commande
        }
        return undefined
    }


    /**
       * supprime une commande de la BDD
       */
    async deleteCommande(id: number): Promise<Commande | undefined> {
        const commande = await this.getCommandeById(id);
        if (commande) {
            commande.remove()

            return commande
        }
        return undefined
    }


    /**
     * modifie une commande par son id de la BDD
     */
    async updateCommande(commandeId: number, menuId: number, restaurantId: number): Promise<Commande | undefined> {
        const commande = await this.getCommandeById(commandeId);
        const menu = await Menu.findOneBy({ id: menuId })
        const restaurant = await Restaurant.findOneBy({ id: restaurantId })

        if (commande && menu && restaurant) {

            commande.menu = menu
            commande.restaurant = restaurant

            await commande.save()
            return commande
        }
        return undefined
    }
}