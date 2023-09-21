// This file can contain routes and controllers related to general application functionality, 
// such as rendering the homepage or handling non-API requests.

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index'); // TODO: Set up a view for this
});

module.exports = router;