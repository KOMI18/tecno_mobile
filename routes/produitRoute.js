const express = require('express');
const router = express.Router();
const produitController  = require('../controllers/produitController');


router.post('/create' , produitController.createProduit);
router.put('/update/:id' ,  produitController.updateProduit);
router.delete('/delete/:id' , produitController.deleteProduit);
router.get('/findOne/:id' , produitController.getProduit)
module.exports =  router ; 