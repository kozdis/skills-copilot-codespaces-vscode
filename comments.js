// Create web server
// 1. npm install express
// 2. npm install body-parser
// 3. npm install cors
// 4. npm install nodemon
// 5. npm install mongoose
// 6. npm install dotenv

// Load modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config();

// Create express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

// Create connection to MongoDB
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Load routes
const commentsRouter = require('./routes/comments');

// Use routes
app.use('/comments', commentsRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});