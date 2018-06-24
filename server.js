const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => res.send('Hello, client'));

const port = 5001;

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
