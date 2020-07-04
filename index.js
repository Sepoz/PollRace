const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const poll = require('./routes/pollRoute.js');

const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use('/api', poll);


const port = 3030;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});