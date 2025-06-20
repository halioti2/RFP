const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8080;

// The URL of your future Python service on Fly.io
// You can use a placeholder for now.
const PYTHON_SERVICE_URL = "https://your-python-app-name.fly.dev/hello";

app.get('/call-python', async (req, res) => {
    try {
        console.log('Sending request to Python service...');
        const response = await axios.post(PYTHON_SERVICE_URL, {
            message: "Hello from Node!"
        });
        console.log('Received response from Python:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Python service:', error.message);
        res.status(500).send('Failed to connect to Python service.');
    }
});

app.listen(PORT, () => {
    console.log(`Node.js server listening on port ${PORT}`);
}); 