const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    propertyType: {
      type: String,
      enum: ['OFFICE', 'RETAIL', 'INDUSTRIAL', 'WAREHOUSE'],
      default: 'OFFICE'
    },
    totalSquareFeet: { type: Number, required: true },
    rentPerSqFt: { type: Number, required: true },
    availableUnits: { type: Number, default: 1 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);