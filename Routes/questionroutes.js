const express = require("express");
const router = express.Router();
const qcontroller = require('../Controllers/questioncontroller');
const validateToken = require('../Middleware/validatetoken');

router.use(validateToken);
router.post('/add',qcontroller.addQuestion);
router.post('/update/:id',qcontroller.updateQuestion);
router.get('/',qcontroller.getQuestion);
router.get('/:type',qcontroller.filterQuestion);
router.delete('/:id',qcontroller.deleteQuestion);

module.exports = router;