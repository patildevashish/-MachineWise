const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const SampleData = require('./SampleData');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the cors middleware
app.use(cors());

// Fetch all sample data
app.get('mongodb://localhost:27017/', async (req, res) => {
  try {
    const sampleData = await SampleData.find();
    res.json(sampleData);
  } catch (err) {
    console.error('Error fetching sample data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Filter sample data based on ts, machine_status, and vibration
app.get('mongodb://localhost:27017/', async (req, res) => {
  const { ts, machine_status, vibration } = req.query;

  try {
    const filteredData = await SampleData.find({
      ts: new Date(ts), // Assuming ts is in date format
      machine_status: parseInt(machine_status), // Assuming machine_status is a number
      vibration: parseFloat(vibration), // Assuming vibration is a number
    });
    res.json(filteredData);
  } catch (err) {
    console.error('Error filtering sample data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
