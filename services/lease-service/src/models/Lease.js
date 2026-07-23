// cat << 'EOF' > src/models/Lease.js
const mongoose = require('mongoose');

const leaseSchema = new mongoose.Schema(
  {
    propertyId: { 
      type: String, 
      required: [true, 'Property ID is required'] 
    },
    tenantName: { 
      type: String, 
      required: [true, 'Tenant / Business Name is required'] 
    },
    tenantEmail: { 
      type: String, 
      required: true 
    },
    suiteNumber: { 
      type: String, 
      required: true 
    },
    monthlyRent: { 
      type: Number, 
      required: true 
    },
    securityDeposit: { 
      type: Number, 
      required: true 
    },
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: { 
      type: Date, 
      required: true 
    },
    status: {
      type: String,
      enum: ['PENDING', 'ACTIVE', 'EXPIRED', 'TERMINATED'],
      default: 'ACTIVE'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lease', leaseSchema);
