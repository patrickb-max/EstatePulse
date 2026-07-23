const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({}, { strict: false });
const Property = mongoose.model('PropertyAnalytics', PropertySchema, 'properties');

exports.getPortfolioSummary = async (req, res) => {
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
};

exports.getCityBreakdown = async (req, res) => {
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
};
