const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// MongoDB and Mongoose setup
mongoose.connect('mongodb+srv://nicholasscinocco2:N36a912S@cluster0.aimnqq7.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
//mongodb+srv://nicholasscinocco2:<password>@cluster0.aimnqq7.mongodb.net/
// Mongoose Schemas
const workoutSchema = new mongoose.Schema({
  type: String,
  duration: Number,
  calories_burned: Number
});

const nutritionSchema = new mongoose.Schema({
  meal: String,
  calories: Number,
  protein: Number
});

const goalSchema = new mongoose.Schema({
  goal_type: String,
  target: Number
});

// Mongoose Models
const Workout = mongoose.model('Workout', workoutSchema);
const Nutrition = mongoose.model('Nutrition', nutritionSchema);
const Goal = mongoose.model('Goal', goalSchema);

// CRUD Routes
app.get('/workouts', async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

app.post('http://localhost:3000/workouts', [
  body('type').isLength({ min: 1 }),
  body('duration').isNumeric(),
  body('calories_burned').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newWorkout = new Workout(req.body);
  await newWorkout.save();
  res.json(newWorkout);
});

app.get('/nutritions', async (req, res) => {
  const nutritions = await Nutrition.find();
  res.json(nutritions);
 });
 
 app.post('/nutritions', [
  body('meal').isLength({ min: 1 }),
  body('calories').isNumeric(),
  body('protein').isNumeric()
 ], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
  }
  const newNutrition = new Nutrition(req.body);
  await newNutrition.save();
  res.json(newNutrition);
 });
 
 app.get('/goals', async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
 });
 
 app.post('/goals', [
  body('goal_type').isLength({ min: 1 }),
  body('target').isNumeric()
 ], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
  }
  const newGoal = new Goal(req.body);
  await newGoal.save();
  res.json(newGoal);
 });

// Server setup
app.listen(3000, () => {
  console.log('Server running on <http://localhost:3000/>');
});
