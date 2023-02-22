const express = require('express');
var bodyParser = require('body-parser');
const apiRouter = require('./routes/api');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = 5000;

app.use('/', apiRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
