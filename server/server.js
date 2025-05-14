const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const connectDb = require('./utils/db');
const medicineRoutes = require('./routes/PatientRoutes');
const authRoute = require('./routes/auth-router');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:5173',"https://medicalremider.onrender.com"],
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', medicineRoutes);
app.use('/api/auth', authRoute);

// Resolve dirname using CommonJS
app.use(express.static(path.join(__dirname, '/client/dist')));

//render client
app.get('*', (req,res) => res.sendFile(path.join(__dirname, '/client/dist/index.html')));

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database and start the server:', error.message);
  });