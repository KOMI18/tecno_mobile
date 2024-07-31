const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminCotroller');

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/getUserLogin', adminController.authMiddleware);
router.get('/data/:id' , adminController.getAdminData)


module.exports = router;
