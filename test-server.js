const express = require('express');

const app = express();
app.use(express.json());

app.post('/telemetry', (req, res) => {
    console.log('\nTelemetry Data Received:');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Type:', req.body.type);
    console.log('Event Name:', req.body.eventName);
    console.log('Data:', JSON.stringify(req.body.data, null, 2));


    res.status(200).json({ success: true, message: 'Telemetry received' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Telemetry capture server running on http://localhost:${PORT}`);
});
