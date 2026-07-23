const Lease = require('../models/Lease');

// @desc    Create new lease agreement
// @route   POST /api/v1/leases
exports.createLease = async (req, res) => {
  try {
    const lease = await Lease.create(req.body);
    res.status(201).json({ success: true, data: lease });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all leases (optional filter by propertyId)
// @route   GET /api/v1/leases
exports.getAllLeases = async (req, res) => {
  try {
    const filter = {};
    if (req.query.propertyId) {
      filter.propertyId = req.query.propertyId;
    }

    const leases = await Lease.find(filter);
    res.status(200).json({ success: true, count: leases.length, data: leases });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single lease details
// @route   GET /api/v1/leases/:id
exports.getLeaseById = async (req, res) => {
  try {
    const lease = await Lease.findById(req.params.id);
    if (!lease) return res.status(404).json({ message: 'Lease agreement not found' });
    res.status(200).json({ success: true, data: lease });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};