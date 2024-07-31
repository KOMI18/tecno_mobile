const express = require('express')
const router = express.Router()
const venteController = require('../controllers/venteController')

router.post('/uniqVente' , venteController.createUniqueVente)
router.post('/create' , venteController.createVente)
router.get('/getventes' , venteController.getVentes)
router.get('/getvente/:id' , venteController.getvente)
router.put('/update/:id' , venteController.updateVente)
router.put('/cloturer/:id' , venteController.cloturerVente);
router.delete('/delete/:id' , venteController.deleteVente)

module.exports = router;