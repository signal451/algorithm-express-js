const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const Router = require('./route/route.js');

// app.use(express.json());

app.use('/', Router);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});