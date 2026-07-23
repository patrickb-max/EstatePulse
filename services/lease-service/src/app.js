const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const leaseRoutes = require('./routes/leaseRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/leases', leaseRoutes);

app.get('/health', (req, res) => res.json({ service: 'Lease Service', status: 'Healthy' }));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`[Lease Service] Running on port ${PORT}`));
