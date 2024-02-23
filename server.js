// bring in express
const express = require('express');
require('dotenv').config();

// set our port (for backend development brad uses 5000)
const port = process.env.PORT || 5000;

const connectDB = require('./config/db');

connectDB();

// initialize express
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// create routes
app.get('/', (req, res) => {
  // This response works the content type is text/html 
  // res.send('Hello World');
  // This also works content type is application/json, you also don't need to use .json() or stringify, just a simple json object works
  res.json({ message: 'Welcome to the RandomIdeas API'});
});

// Connect server to ideas
const ideasRouter = require('./routes/ideas');
// add middleware (look this up) if the user goes to /api/ideas with app.use()
app.use('/api/ideas', ideasRouter);

// create server
app.listen(port, () => console.log(`Server listening on port ${port}`));