const Expense = require('../models/Expense');

exports.addExpense = async (expenseData) => {
  const expense = new Expense(expenseData);
  await expense.save();
  return expense;
};

exports.getUserExpenses = async (userId) => {
  return await Expense.find({ creator: userId }).populate('creator', 'name email ');
};

exports.getAllExpenses = async () => {
  const expenses=await Expense.find().populate('creator', 'name email');


  
  const userMap = new Map();

  // Iterate through each expense and their splits
  expenses.forEach(expense => {
    // Ensure creator is stored in userMap
    if (!userMap.has(expense.creator._id.toString())) {
      userMap.set(expense.creator._id.toString(), {
        userId: expense.creator._id.toString(),
        name: expense.creator.name,
        email: expense.creator.email,
        totalAmount: 0
      });
    }
  });

  // Sum the amounts for each user in the splits array
  expenses.forEach(expense => {
    expense.splits.forEach(split => {
      const splitUserId = split.user.toString();
      
     if(userMap.has(splitUserId))
     {
         // Update the totalAmount for the split user
      const userData = userMap.get(splitUserId);
      userData.totalAmount += split.amount;
      userMap.set(splitUserId, userData);
     }
    });
  });

  
  const userList = Array.from(userMap.values());
  return userList
};

exports.generateBalanceSheet = async () => {
  const expenses = await Expense.find().populate('creator', 'name email');
  const userMap = new Map();

  // Iterate through each expense and their splits
  expenses.forEach(expense => {
    // Ensure creator is stored in userMap
    if (!userMap.has(expense.creator._id.toString())) {
      userMap.set(expense.creator._id.toString(), {
        userId: expense.creator._id.toString(),
        name: expense.creator.name,
        email: expense.creator.email,
        totalAmount: 0
      });
    }
  });

  // Sum the amounts for each user in the splits array
  expenses.forEach(expense => {
    expense.splits.forEach(split => {
      const splitUserId = split.user.toString();
      
     if(userMap.has(splitUserId))
     {
         // Update the totalAmount for the split user
      const userData = userMap.get(splitUserId);
      userData.totalAmount += split.amount;
      userMap.set(splitUserId, userData);
     }
    });
  });

  
  const userList = Array.from(userMap.values());
  return userList
};