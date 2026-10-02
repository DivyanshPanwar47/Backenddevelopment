require('dotenv').config();

const express = require('express');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = Number(process.env.PORT) || 3013;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Experiment 13A API is running.' });
});

app.use('/api/auth', authRoutes);

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && error.body) {
    return res.status(400).json({ message: 'Request body must contain valid JSON.' });
  }
  return next(error);
});

if (require.main === module) {
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`Experiment 13A running at http://localhost:${PORT}`)))
    .catch((error) => {
      console.error(`MongoDB connection failed: ${error.message}`);
      process.exitCode = 1;
    });
}

module.exports = app;
