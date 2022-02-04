require('dotenv').config();
const express = require('express');
const app = express();

require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || process.env.PORT;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;
