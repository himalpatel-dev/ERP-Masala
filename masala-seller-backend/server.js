require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/models');
const authRoutes = require('./src/routes/auth.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON bodies

// Simple Route to test
app.get('/', (req, res) => {
    res.json({ message: 'Masala Marketplace API is running!' });
});

app.use('/api/admin', authRoutes);


// Server Port
const PORT = process.env.PORT || 3000;
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('✅ Database & Tables synced successfully.');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Failed to sync database:', err);
    });