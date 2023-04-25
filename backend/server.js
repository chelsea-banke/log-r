const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(3300, () => console.log('Example app is listening on port 3000.'));