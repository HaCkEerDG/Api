const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory data (for demonstration purposes)
let joinTeamRequests = [];
let permissionRequests = [];
let crimeReports = [];

// Sample initial data
joinTeamRequests = [
    { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Developer', status: 'Pending', skills: ['JavaScript', 'Node.js'], requested: '2025-03-21T12:00:00Z', experience: '5 years in web development' }
];

permissionRequests = [
    { id: 1, company: 'Example Corp', requestType: 'Penetration Test', status: 'Pending', details: 'Access to XYZ system', categories: ['Security'], requested: '2025-03-21T12:00:00Z' }
];

crimeReports = [
    { id: 1, title: 'Phishing Attempt', target: 'example@domain.com', urgency: 'High', details: 'Fake emails being sent', categories: ['Phishing'], reported: '2025-03-21T12:00:00Z' }
];

// Endpoint to submit a report (already existing)
app.post('/submit-report', (req, res) => {
    const { message } = req.body;
    if (message) {
        reports.push({ message, timestamp: new Date() });
        return res.status(200).json({ message: 'Report submitted successfully!' });
    }
    return res.status(400).json({ message: 'No message provided!' });
});

// Endpoint to fetch all reports (already existing)
app.get('/get-reports', (req, res) => {
    res.status(200).json({ reports });
});

// Fetch Join Team Requests
app.get('/api/joinTeamRequests', (req, res) => {
    res.status(200).json(joinTeamRequests);
});

// Fetch Permission Requests
app.get('/api/permissionRequests', (req, res) => {
    res.status(200).json(permissionRequests);
});

// Fetch Crime Reports
app.get('/api/crimeReports', (req, res) => {
    res.status(200).json(crimeReports);
});

// Handle Join Team Request Actions (Accept/Decline)
app.post('/api/joinTeamRequests/:id/:action', (req, res) => {
    const { id, action } = req.params;
    const request = joinTeamRequests.find(r => r.id == id);
    if (!request) return res.status(404).json({ message: 'Request not found!' });

    if (action === 'accept') {
        request.status = 'Accepted';
    } else if (action === 'decline') {
        request.status = 'Declined';
    } else {
        return res.status(400).json({ message: 'Invalid action!' });
    }

    return res.status(200).json({ message: `Request ${action}ed successfully!` });
});

// Handle Permission Request Actions (Approve/Reject)
app.post('/api/permissionRequests/:id/:action', (req, res) => {
    const { id, action } = req.params;
    const request = permissionRequests.find(r => r.id == id);
    if (!request) return res.status(404).json({ message: 'Request not found!' });

    if (action === 'accept') {
        request.status = 'Approved';
    } else if (action === 'decline') {
        request.status = 'Rejected';
    } else {
        return res.status(400).json({ message: 'Invalid action!' });
    }

    return res.status(200).json({ message: `Request ${action}ed successfully!` });
});

// Handle Crime Report Actions (Mark as Pending)
app.post('/api/crimeReports/:id/markPending', (req, res) => {
    const { id } = req.params;
    const report = crimeReports.find(r => r.id == id);
    if (!report) return res.status(404).json({ message: 'Report not found!' });

    report.status = 'Pending';
    return res.status(200).json({ message: 'Crime report marked as pending.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});
