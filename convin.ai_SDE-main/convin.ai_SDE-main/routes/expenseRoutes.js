const express = require('express');
const { body } = require('express-validator');
const expenseController = require('../controllers/expenseController');
const validateRequest = require('../middleware/validateRequest');
const auth = require('../middleware/auth');

const router = express.Router();

router.post(
  '/add',
  auth,
  [
    body('description').notEmpty(),
    body('amount').isNumeric(),
    body('splitMethod').isIn(['equal', 'exact', 'percentage']),
    body('splits').isArray(),
  ],
  validateRequest,
  expenseController.addExpense
);

router.get('/user', auth , expenseController.getUserExpenses);
router.get('/all', auth, expenseController.getAllExpenses);
router.get('/balance-sheet', auth, expenseController.getBalanceSheet);

module.exports = router;