const express = require("express");
const router = express.Router();
const usercontroller = require('../Controllers/usercontroller');
const validateToken = require('../Middleware/validatetoken');


router.post('/adduser',usercontroller.adduser);
router.post('/login',usercontroller.loginuser);
router.put('/update/:id',usercontroller.updateuser);
router.delete('/delete/:id',usercontroller.deleteuser);
router.get('/current',validateToken,usercontroller.currentUser)

module.exports = router;