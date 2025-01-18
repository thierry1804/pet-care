const express = require('express');
const app = express();
const port = 3000;

// ...existing code...

app.get('/', (req, res) => {
  res.send('Welcome to the Pet Care Home Page');
});

// ...existing code...

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
