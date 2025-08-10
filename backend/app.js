const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./models/db'); // Connect to MongoDB

const authRouter = require('./routes/authRouter');
const homeRoutes = require('./routes/HomeRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://secure-vault-mahos.vercel.app"], // your frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.send("Hello world");
});

app.get('/login', (req, res) => {
  res.send("Hello login");
});

app.use('/auth', authRouter);
app.use('/home', homeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
