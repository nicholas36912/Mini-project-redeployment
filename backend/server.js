const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 

const app = express();
app.use(bodyParser.json()); 

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/stepTracker', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// MongoDB Schema and Model
const stepSchema = new mongoose.Schema({
  steps: Number
});

const Step = mongoose.model('Step', stepSchema);

// API Endpoints
app.get('/api/steps', async (req, res) => {
  try {
    const steps = await Step.find();
    res.json(steps);
  } catch (error) {
    console.error('Error fetching steps:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/steps', async (req, res) => {
  try {
    const newStep = new Step({ steps: req.body.steps });
    await newStep.save();
    res.json(newStep);
  } catch (error) {
    console.error('Error adding step:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Server setup
app.listen(8000, () => {
  console.log('Server running on <http://localhost:8000/>');
});
