const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const connectDb = require('./utils/db');
const medicineRoutes = require('./routes/PatientRoutes');
const authRoute = require('./routes/auth-router');


const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', medicineRoutes);
app.use('/api/auth', authRoute);


connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database and start the server:', error.message);
  });