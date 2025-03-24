const express = require('express');
const { body } = require('express-validator');
const db = require('../nighthawk-db/db');
const { generateToken, authenticateToken, validateInput } = require('../nighthawk-db/utils');

const router = express.Router();

// Middleware to add custom headers to the response
const addCustomHeaders = (req, res, next) => {
  res.setHeader('X-Custom-Message', 'This is a custom API developed by Launchly');
  next();
};

router.use(addCustomHeaders);

// User authentication (for demonstration purposes)
const users = [
  { id: 1, username: 'admin', password: 'password', role: 'admin' },
  { id: 2, username: 'user', password: 'password', role: 'user' },
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.get('/admin/data', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Retrieve data from the database and send it as a response
  const data = Object.values(db);
  res.json(data);
});

router.post('/reports', authenticateToken, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  validateInput,
], (req, res) => {
  const { title, description } = req.body;
  const report = {
    id: Date.now(),
    title,
    description,
    status: 'pending',
    createdAt: new Date(),
  };

  db.addEntry(report.id, report);
  res.status(201).json(report);
});

router.post('/permissions', authenticateToken, [
  body('reason').notEmpty().withMessage('Reason is required'),
  validateInput,
], (req, res) => {
  const { reason } = req.body;
  const permissionRequest = {
    id: Date.now(),
    userId: req.user.id,
    reason,
    status: 'pending',
    createdAt: new Date(),
  };

  db.addEntry(permissionRequest.id, permissionRequest);
  res.status(201).json(permissionRequest);
});

router.post('/applications', authenticateToken, [
  body('coverLetter').notEmpty().withMessage('Cover letter is required'),
  validateInput,
], (req, res) => {
  const { coverLetter } = req.body;
  const teamApplication = {
    id: Date.now(),
    userId: req.user.id,
    coverLetter,
    status: 'pending',
    createdAt: new Date(),
  };

  db.addEntry(teamApplication.id, teamApplication);
  res.status(201).json(teamApplication);
});

module.exports = router;