const app = require('./app');

const PORT = 3000;

// Start server
const server = app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})

module.exports = server;