const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const Router = require('./route/route.js');

app.use(bodyParser.json());
app.use('/', Router);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});