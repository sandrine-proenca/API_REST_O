# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

# UTILISATEUR:

Ce que l'utilisateur peut faire:

1. s'enregistrer dans la BDD avec un email et un password
**.addUser()**

2. se connecter avec son email et son password
**.getUserByEmail**

3. créer une commande avec un restaurant (id) et un menu (id)
**.postCommande()**

4. appeler sa propre commande en l'appelant par son id pour la modifier
**.updateCommande()**

5. regarder toutes les commandes déjà enregistrées 
**.getAllCommandes()**

6. regarder l'une de ses propre commandes (id du restaurant et id du menu)
**.getCommandeById()**

7. appeler sa propre commande en l'appelant par son id pour la supprimer
**.deleteCommande()**

8. regarder tous les restaurants déjà enregistrées
**.getAllRestaurant**

9. regarder l'un des restaurants déjà enregistrées par son id
**.getRestaurantById**

10. regarder tous les menus déjà enregistrées
**.getAllMenus()**

11. regarder l'un des menus déjà enregistrées par son id
**.getMenuById()**



# ADMIN:

Ce que l'admin peut faire en plus de l'utilisateur:

1. créer un restaurant
**.postRestaurant**

2. appeler un restaurant par son id pour le modifier
**.putRestaurantById**

3. appeler un restaurant par son id pour le supprimer
**.deleteRestaurant**

4. créer un menu
**.postmenu()**

5. appeler un un menu par son id pour le modifier
**.updateMenu()**

6. appeler un menu par son id pour le supprimer
**.deleteMenu()**
