const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const Workout = mongoose.model('Workout', workoutSchema);
const Nutrition = mongoose.model('Nutrition', nutritionSchema);
const Goal = mongoose.model('Goal', goalSchema);

const app = express();
app.use(express.json());

// MongoDB and Mongoose setup
mongoose.connect('mongodb://localhost:27017/fitnessTracker', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Passport.js Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// User Sessions
app.use(session({
  secret: "YourSecretKeyHere",
  resave: false,
  saveUninitialized: false
}));

// User Routes
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ username: req.body.username, email: req.body.email, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully' });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
});

// Workouts Route
app.get('/workouts', async (req, res) => {

  const workouts = await Workout.find();
  res.json(workouts);
});

// Nutritions Route
app.get('/nutritions', async (req, res) => {

  const nutritions = await Nutrition.find();
  res.json(nutritions);
});

// Goals route
app.get('/goals', async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
});
// workouts Route-post
app.post('/workouts', async (req, res) => {
  try {
    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    res.json(newWorkout);
  } catch (error) {
    console.error('Error adding workout entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Nutritions Route-post
app.post('/nutritions', async (req, res) => {
  try {
    const newNutrition = new Nutrition(req.body);
    await newNutrition.save();
    res.json(newNutrition);
  } catch (error) {
    console.error('Error adding nutrition entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GoalsRoute-pots
app.post('/goals', async (req, res) => {
  try {
    const newGoal = new Goal(req.body);
    await newGoal.save();
    res.json(newGoal);
  } catch (error) {
    console.error('Error adding goal entry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Server setup
app.listen(3000, () => {
  console.log('Server running on <http://localhost:3000/>');
});
