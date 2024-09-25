const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3000

// Base endpoint
app.get('/v1/product', (req, res) => {
    res.send("hello");
});

// Start server
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})