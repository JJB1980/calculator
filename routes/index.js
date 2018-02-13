const express = require('express');
const router = express.Router();

const actions = require('./actions');

router.get('/addition/:val1/:val2', (req, res) => {
  actions.execute('addition', req, res);
});
router.get('/subtraction/:val1/:val2', (req, res) => {
  actions.execute('subtraction', req, res);
});
router.get('/multiplication/:val1/:val2', (req, res) => {
  actions.execute('multiplication', req, res);
});
router.get('/division/:val1/:val2', (req, res) => {
  actions.execute('division', req, res);
});

module.exports = router;
