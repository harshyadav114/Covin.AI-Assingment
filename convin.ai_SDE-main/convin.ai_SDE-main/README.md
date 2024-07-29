# Daily Expenses Sharing Application
This is a backend application for managing and sharing daily expenses among users.
## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add the following:
4. Run the application: `npm run dev`


## API Endpoints

### User Management

- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile (requires authentication)

### Expense Management

- POST /api/expenses/add - Add a new expense (requires authentication)
- GET /api/expenses/user - Get user's expenses (requires authentication)
- GET /api/expenses/all - Get all expenses (requires authentication)
- GET /api/expenses/balance-sheet - Get balance sheet (requires authentication)
- balance sheet is in xlxs format that is store in utils folder  

## Technologies Used


- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication



