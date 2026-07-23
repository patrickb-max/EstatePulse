const express = require('express');
const router = express.Router();
const { createProperty, getAllProperties } = require('../controllers/propertyController');

router.route('/')
  .post(createProperty)
  .get(getAllProperties);

module.exports = router;
