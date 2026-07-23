const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({ success: true, data: property });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({ success: true, count: properties.length, data: properties });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
