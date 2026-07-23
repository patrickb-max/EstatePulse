const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const workOrderRoutes = require('./routes/workOrderRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/maintenance', workOrderRoutes);

app.get('/health', (req, res) => res.json({ service: 'Maintenance Service', status: 'Healthy' }));

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`[Maintenance Service] Running on port ${PORT}`));