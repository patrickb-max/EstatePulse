const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const propertyRoutes = require('./routes/propertyRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/properties', propertyRoutes);

app.get('/health', (req, res) => res.json({ service: 'Property Service', status: 'Healthy' }));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`[Property Service] Running on port ${PORT}`));
