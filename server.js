const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory reports (for demonstration purposes)
let reports = [];

// Endpoint to submit a report
app.post('/submit-report', (req, res) => {
  const { message } = req.body;
  if (message) {
    reports.push({ message, timestamp: new Date() });
    return res.status(200).json({ message: 'Report submitted successfully!' });
  }
  return res.status(400).json({ message: 'No message provided!' });
});

// Endpoint to fetch all reports
app.get('/get-reports', (req, res) => {
  res.status(200).json({ reports });
});

// Start the server
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
