require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const adminMessageRoutes = require('./routes/adminMessageRoutes');
const adminAppointmentRoutes = require('./routes/adminAppointmentRoutes');
const User = require('./models/User');
const adminUserRoutes = require('./routes/adminUserRoutes');

const app = express();

// Specific origin instead of wildcard
const corsOptions = {
  origin: ['https://shrivagdeviconstructions.com', 'http://localhost:5173','https://shrivagdeviconstructions.vercel.app'],// Both production and development URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Update the CORS headers middleware
app.use((req, res, next) => {
  const allowedOrigins = ['https://final-brown-six.vercel.app', 'http://localhost:5173'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).json({
      body: "OK"
    });
  }
  
  next();
});

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin/messages', adminMessageRoutes);
app.use('/api/admin/appointments', adminAppointmentRoutes);
app.use('/api/admin/users', adminUserRoutes);

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && await user.matchPassword(password)) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Login failed' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Registration service error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
