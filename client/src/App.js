import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    axios.get('/api/v1/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRefresh = () => {
    axios.get('/api/v1.users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const incrementSteps = () => {
    // Update the endpoint to add a new step to MongoDB
    axios.post('/api/steps', { steps: steps + 1 })
      .then(response => {
        setSteps(response.data.steps);
      })
      .catch(error => {
        console.error('Error adding step:', error);
      });
  };

  return (
    <div>
      {/* Existing code for user list */}

      <div>
        <h2>Fitness Tracker</h2>
        <p>Steps Today: {steps}</p>
        <button onClick={incrementSteps}>Add Step</button>
        {steps >= 10 && <p>You've reached your step goal!</p>}
      </div>
    </div>
  );
};

export default App;
