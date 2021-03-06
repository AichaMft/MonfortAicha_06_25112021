const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

//Créer une sauce 
router.post('/', auth , multer, saucesCtrl.createSauce );

//Modifier une sauces en vérifiant l'id 
router.put('/:id', auth , multer, saucesCtrl.modifySauce );

//Supprimer une sauce en vérifiant l'id
router.delete('/:id', auth , saucesCtrl.deleteSauce );

//Récuperer toutes les sauces
router.get('/', auth , saucesCtrl.getAllSauces );

//Récuperer une sauce en vérifiant l'id
router.get('/:id', auth , saucesCtrl.getOneSauce );

//Route pour les likes
router.post('/:id/like', auth, saucesCtrl.likes);

module.exports = router;