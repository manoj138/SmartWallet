const express = require('express');

const router = express.Router();

const ExpenseController = require('../controllers/ExpenseController');
const auth = require('../middleware/auth');


router.get('/', auth, ExpenseController.index);

router.post('/store',auth, ExpenseController.store);

router.get('/:id/find',auth, ExpenseController.find);

router.put('/:id/update',auth, ExpenseController.update);

router.delete('/:id/delete',auth, ExpenseController.deleteE);

module.exports = router;