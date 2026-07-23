const WorkOrder = require('../models/WorkOrder');

// @desc    Create a new work order / ticket
// @route   POST /api/v1/maintenance
exports.createWorkOrder = async (req, res) => {
  try {
    const workOrder = await WorkOrder.create(req.body);
    res.status(201).json({ success: true, data: workOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all work orders (optional filter by propertyId)
// @route   GET /api/v1/maintenance
exports.getAllWorkOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.propertyId) {
      filter.propertyId = req.query.propertyId;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const workOrders = await WorkOrder.find(filter);
    res.status(200).json({ success: true, count: workOrders.length, data: workOrders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update work order status or assign vendor
// @route   PUT /api/v1/maintenance/:id
exports.updateWorkOrder = async (req, res) => {
  try {
    const workOrder = await WorkOrder.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!workOrder) return res.status(404).json({ message: 'Work order not found' });
    res.status(200).json({ success: true, data: workOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
