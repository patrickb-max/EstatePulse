const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Connect to DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[Analytics Service] Connected to MongoDB Atlas: ${conn.connection.host}`);
  } catch (err) {
    console.error(`[Analytics Service] DB Error: ${err.message}`);
    process.exit(1);
  }
};
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Dynamic Schema
const PropertySchema = new mongoose.Schema({}, { strict: false });
const Property = mongoose.model('PropertyAnalytics', PropertySchema, 'properties');

// Route 1: Portfolio Summary KPIs
app.get('/api/v1/analytics/portfolio-summary', async (req, res) => {
  try {
    const summary = await Property.aggregate([
      {
        $project: {
          name: 1,
          city: 1,
          totalSquareFeet: 1,
          rentPerSqFt: 1,
          annualRevenue: { $multiply: ["$totalSquareFeet", "$rentPerSqFt"] }
        }
      },
      {
        $group: {
          _id: null,
          totalProperties: { $sum: 1 },
          totalSquareFeetManaged: { $sum: "$totalSquareFeet" },
          totalProjectedAnnualRevenue: { $sum: "$annualRevenue" },
          avgRentPerSqFt: { $avg: "$rentPerSqFt" },
          minRentPerSqFt: { $min: "$rentPerSqFt" },
          maxRentPerSqFt: { $max: "$rentPerSqFt" }
        }
      }
    ]);

    const result = summary.length > 0 ? summary[0] : {
      totalProperties: 0,
      totalSquareFeetManaged: 0,
      totalProjectedAnnualRevenue: 0,
      avgRentPerSqFt: 0,
      minRentPerSqFt: 0,
      maxRentPerSqFt: 0
    };

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route 2: City Breakdown
app.get('/api/v1/analytics/city-breakdown', async (req, res) => {
  try {
    const cityData = await Property.aggregate([
      {
        $group: {
          _id: "$city",
          propertyCount: { $sum: 1 },
          totalSqFt: { $sum: "$totalSquareFeet" },
          avgRentSqFt: { $avg: "$rentPerSqFt" }
        }
      },
      { $sort: { totalSqFt: -1 } }
    ]);

    res.status(200).json({ success: true, data: cityData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/health', (req, res) => res.json({ service: 'Analytics Service', status: 'Healthy' }));

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`[Analytics Service] Running on port ${PORT}`));
