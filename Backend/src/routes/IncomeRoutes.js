const express = require('express');
const router = express.Router();
const IncomeController = require('../controllers/IncomeController');
const auth = require('../middleware/auth'); // Middleware import kara

// Ata pratyek route la 'auth' dya
router.get('/', auth, IncomeController.index);
router.post('/store', auth, IncomeController.store);
router.get('/:id/find', auth, IncomeController.find);
router.put('/:id/update', auth, IncomeController.update);
router.delete('/:id/delete', auth, IncomeController.deleteI);

module.exports = router;