const dns = require('dns');
// Override local ISP DNS with Google and Cloudflare DNS
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.get('/health', (req, res) => res.json({ service: 'Auth Service', status: 'Healthy' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`[Auth Service] Running on port ${PORT}`));