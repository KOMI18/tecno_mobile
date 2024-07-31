const express = require('express')
const router = express.Router()
const fournisseurController = require('../controllers/fournisseurController')
const venteController = require('../controllers/venteController')


router.post('/create' , fournisseurController.createfournisseur)
router.get('getFournisseurs' , fournisseurController.getfournisseurs)
router.get('/getFournisseur' , fournisseurController.getfournisseur)
router.put('/update' , fournisseurController.updatefournisseur)
router.delete('delete' , fournisseurController.deletefournisseur)
router.get('/getvente/:id' , venteController.getvente)

module.exports = router ;