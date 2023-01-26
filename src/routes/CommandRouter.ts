import express = require('express');
import { CommandeController } from "../controllers/commandController";
import { authenticateJWT } from "../middleware/auth";




export const commandeRouter=express.Router();

const commandeController=new CommandeController


commandeRouter.get('/', commandeController.getCommandes)


commandeRouter.get('/:id',commandeController.getCommandeId)


commandeRouter.post('/',authenticateJWT, commandeController.postCommande)


commandeRouter.delete('/:id', authenticateJWT, commandeController.deleteCommande)


commandeRouter.put('/:id',authenticateJWT,commandeController.updateCommande)
