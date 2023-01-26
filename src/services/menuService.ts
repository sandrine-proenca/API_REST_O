import { Menu } from "../entity/Menu";



/**
 * Class permettant la gestion des requètes SQL pour les menus
 * * **.getAllMenus()** : recupère tous les menus de la BDD
 * * **.getMenuById()** : recupère un menu par son id de la BDD
 * * **.postmenu()** : ajoute un nouveau menu à la BDD
 * * **.updateMenu()** : modifie un menu par son id de la BDD
 * * **.deleteMenu()** : supprime un menu de la BDD
 */
export class MenuService {



    /**
        * recupère tout les menus de la BDD 
        */
    async getAllMenus() {
        const menus = await Menu.find();

        return menus;
    }



    /**
     * recupère un menu par son id de la BDD
     */
    async getMenuById(id: number) {
        const menu = await Menu.findBy({ id: id });
        return menu[0]
    }



    /**
     * ajoute un nouveau menu à la BDD
     */
    async postMenu(name: string, price: string) {

        const menu = new Menu()
        menu.name = name
        menu.price = price

        await menu.save()

        return menu
    }



    /**
     * supprime un menu de la BDD
     */
    async deleteMenu(id: number): Promise<Menu | undefined> {
        const menu = await this.getMenuById(id);

        menu.remove()

        return menu

    }



    /**
     * modifie un menu par son id de la BDD
     */
    async updateMenu(updateName: string, UpdatePrice: string, id: number) {
        const menu = await this.getMenuById(id);
        menu.name = updateName
        menu.price = UpdatePrice

        Menu.save(menu)

        return menu

    }

}