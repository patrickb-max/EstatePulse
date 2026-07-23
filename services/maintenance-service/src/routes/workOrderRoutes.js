const express = require('express');
const router = express.Router();
const { createWorkOrder, getAllWorkOrders, updateWorkOrder } = require('../controllers/workOrderController');

router.route('/')
  .post(createWorkOrder)
  .get(getAllWorkOrders);

router.route('/:id')
  .put(updateWorkOrder);

module.exports = router;