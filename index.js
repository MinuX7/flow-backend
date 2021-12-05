const http = require("http");
const express = require('express');
const port = 5000;
var cors = require('cors');
const app = new express();
require('./flow-api/flows')(app);
require('./flow-api/reservations')(app);
//Create HTTP server and listen on port 3000 for requests

app.use(cors());
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));