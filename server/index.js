const express = require('express');
const apiRouter = require('./routes/api');
const app = express();
const port = 5000;

app.use('/api/', apiRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
