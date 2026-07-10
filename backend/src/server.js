const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const messageRoutes = require('./routes/messageRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const settingRoutes = require('./routes/settingRoutes');

// Load env vars
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Adjust this for Vercel domain later in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/settings', settingRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('DevPortfolio API is running...');
});

// Global Error Handler (must be the last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
