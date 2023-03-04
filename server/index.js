const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const cors = require('cors');

const app = express();
// parse application/x-www-form-urlencoded
app.use(cors({ origin: '*' }), bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = 5111;

app.use('/', apiRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
