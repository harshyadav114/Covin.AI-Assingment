const expenseService = require('../services/expenseService');
const { generateAndDownloadExcel } = require('../utils/sheetdownload');
const validateSplits = (creator, splits, totalAmount, method) => {
  let creatorIncluded = false;

  splits.forEach(split => {
    if (split.user === creator) {
      creatorIncluded = true;
    }
 
  });

  if (!creatorIncluded) {
    return { isValid: false, message: 'Creator must be included in the splits expenses also' };
  }

  if (method === 'percentage') {
    let totalPercentage = 0;
    splits.forEach(split => {
      totalPercentage += split.amount;
   
    });
  
    if (totalPercentage !== 100) {
      return { isValid: false, message: 'Total percentage does not equal 100%' };
    }
  } else {
    let totalSplitAmount = 0;
    splits.forEach(split => {
      totalSplitAmount += split.amount;
    });
    if (totalSplitAmount !== totalAmount) {
      return { isValid: false, message: 'Total amount does not match the sum of all split amounts' };
    }
  }

  return { isValid: true };
};

exports.addExpense = async (req, res) => {
  try {
    const { creator, amount, splits, splitMethod } = req.body;

    const validationResponse = validateSplits(creator, splits, amount, splitMethod);
    if (!validationResponse.isValid) {
      return res.status(400).send({ message: validationResponse.message });
    }

    const expenseData = {
      ...req.body,
      creator: req.user.userId,
    };
    const expense = await expenseService.addExpense(expenseData);
    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred while adding the expense', error: error.message });
  }
};

exports.getUserExpenses = async (req, res) => {
    try {
      console.log(req.user.userId, "user");
      
      // Fetch user expenses
      const expenses = await expenseService.getUserExpenses(req.user.userId);
      
      // Initialize total amount and user details
      let totalAmount = 0;
      let userDetails = null;
      
      // Calculate total amount for the user
      expenses.forEach(expense => {
        expense.splits.forEach(split => {
            console.log(split.amount,split.user.toString(),req.user.userId)
          if (split.user.toString() === req.user.userId) {
            totalAmount += split.amount;
               
            // Set user details from the creator field if they match the request user ID
            if (!userDetails) {
              userDetails = {
                name: expense.creator.name,
                email: expense.creator.email
              };
            }
          }
        });
      });
  
      // Ensure userDetails is set, if not, set it manually from the first expense's creator field
      if (!userDetails && expenses.length > 0) {
        userDetails = {
          name: expenses[0].creator.name,
          email: expenses[0].creator.email
        };
      }
      
      // Send the total amount along with user details to the frontend
      res.status(201).json({ 
       
        name:userDetails.name,
        email:userDetails.email,

        totalAmount
       
      });
    } catch (error) {
      res.status(400).json({ message: 'Failed to get user expenses', error: error.message });
    }
  };
  

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get all expenses', error: error.message });
  }
};

exports.getBalanceSheet = async (req, res) => {
  try {
    const balanceSheet = await expenseService.generateBalanceSheet();
    generateAndDownloadExcel(balanceSheet,res)
   
    res.json(balanceSheet);
  } catch (error) {
    res.status(400).json({ message: 'Failed to generate balance sheet', error: error.message });
  }
};
