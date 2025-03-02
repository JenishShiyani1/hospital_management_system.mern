const express = require('express');
const { adminRegister , adminLogin , getAdminById } = require('../controllers/adminController');
const upload = require('../middlewares/imageUpload');

const router = express.Router();

router.post('/admin-register' , upload.single('profile') , adminRegister);

router.post('/admin-login' , adminLogin);

router.get('/admin-id/:id',getAdminById);

module.exports = router;    