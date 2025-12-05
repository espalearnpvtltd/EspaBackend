import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(cors());          // Allow requests from anywhere
app.use(express.json());  // Parse JSON
app.use(morgan('dev'));   // Logging

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Backend running successfully!');
});

// =====================
// AUTH ROUTES
// =====================
const users = []; // Temporary in-memory storage

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);

  res.status(201).json({ message: 'User registered!', user: newUser });
});

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ message: 'Login successful', user });
});

// Start server
const PORT = 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
