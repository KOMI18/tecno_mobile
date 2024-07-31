const express = require('express')
const router = express.Router()
const commandeController = require('../controllers/commandeController')


router.post('/create' , commandeController.createCommandes)
router.post('/createuniq' , commandeController.createUniqueCommande)
router.get('/getcommandes' , commandeController.getcommandes)
router.get('/getcommande/:id' , commandeController.getcommande)
router.put('/update/:id' , commandeController.updatecommande)
router.put('/cloturer/:id' , commandeController.cloturerCommande)
router.delete('/delete/:id' , commandeController.deletecommande)
router.get('/dataById/:id' , commandeController.getCommandeData);

module.exports = router ;