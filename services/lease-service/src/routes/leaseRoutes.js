const express = require('express');
const router = express.Router();
const { createLease, getAllLeases, getLeaseById } = require('../controllers/leaseController');

router.route('/')
  .post(createLease)
  .get(getAllLeases);

router.route('/:id')
  .get(getLeaseById);

module.exports = router;
