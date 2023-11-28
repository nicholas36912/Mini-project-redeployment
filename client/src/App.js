import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [steps, setSteps] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [nutritions, setNutritions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [showWorkouts, setShowWorkouts] = useState(false);
  const [showNutritions, setShowNutritions] = useState(false);
  const [showGoals, setShowGoals] = useState(false);

  useEffect(() => {
    // Fetch workouts when the component mounts
    axios.get('/workouts')
      .then(response => {
        setWorkouts(response.data);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
      });

    // Fetch nutritions when the component mounts
    axios.get('/nutritions')
      .then(response => {
        setNutritions(response.data);
      })
      .catch(error => {
        console.error('Error fetching nutritions:', error);
      });

    // Fetch goals when the component mounts
    axios.get('/goals')
      .then(response => {
        setGoals(response.data);
      })
      .catch(error => {
        console.error('Error fetching goals:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const incrementSteps = () => {
    axios.post('/api/steps', { steps: steps + 1 })
      .then(response => {
        setSteps(response.data.map(step => step.steps).reduce((a, b) => a + b, 0));
      })
      .catch(error => {
        console.error('Error adding step:', error);
      });
  };

  const handleFetchWorkouts = () => {
    // Fetch workouts when the button is clicked
    axios.get('/workouts')
      .then(response => {
        setWorkouts(response.data);
        setShowWorkouts(true);
        setShowNutritions(false);
        setShowGoals(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
      });
  };

  const handleFetchNutritions = () => {
    // Fetch nutritions when the button is clicked
    axios.get('/nutritions')
      .then(response => {
        setNutritions(response.data);
        setShowWorkouts(false);
        setShowNutritions(true);
        setShowGoals(false);
      })
      .catch(error => {
        console.error('Error fetching nutritions:', error);
      });
  };

  const handleFetchGoals = () => {
    // Fetch goals when the button is clicked
    axios.get('/goals')
      .then(response => {
        setGoals(response.data);
        setShowWorkouts(false);
        setShowNutritions(false);
        setShowGoals(true);
      })
      .catch(error => {
        console.error('Error fetching goals:', error);
      });
  };

  return (
    <div>
      <div>
        <h2>Fitness Tracker</h2>
        <button onClick={incrementSteps}>Add Step</button>
        {steps >= 10 && <p>You've reached your step goal!</p>}

        {/* Buttons to fetch and reveal data */}
        <button onClick={handleFetchWorkouts}>Fetch Workouts</button>
        <button onClick={handleFetchNutritions}>Fetch Nutritions</button>
        <button onClick={handleFetchGoals}>Fetch Goals</button>

        {/* Display data based on the selected category */}
        {showWorkouts && (
          <div>
            <h3>Workouts</h3>
            <ul>
              {workouts.map(workout => (
                <li key={workout._id}>{workout.type} - Duration: {workout.duration} minutes</li>
              ))}
            </ul>
          </div>
        )}

        {showNutritions && (
          <div>
            <h3>Nutritions</h3>
            <ul>
              {nutritions.map(nutrition => (
                <li key={nutrition._id}>{nutrition.meal} - Calories: {nutrition.calories}, Protein: {nutrition.protein}</li>
              ))}
            </ul>
          </div>
        )}

        {showGoals && (
          <div>
            <h3>Goals</h3>
            <ul>
              {goals.map(goal => (
                <li key={goal._id}>{goal.goal_type} - Target: {goal.target}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
