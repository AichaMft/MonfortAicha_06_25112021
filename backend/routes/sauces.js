const express = require('express');

const router = express.Router();

const saucesCtrl = require('../controllers/sauces');

const auth = require('../middleware/auth');

//Créer une sauce 
router.post('/', auth , saucesCtrl.createThing );

//Modifier une sauces en vérifiant l'id 
router.put('/:id', auth , saucesCtrl.modifyThing );

//Supprimer une sauce en vérifiant l'id
router.delete('/:id', auth , saucesCtrl.deleteThing );

//Récuperer une sauce en vérifiant l'id
router.get('/:id', auth , saucesCtrl.getOneThing );

//Récuperer toutes les sauces
router.get('/', auth , saucesCtrl.getAllThings );

module.exports = router;