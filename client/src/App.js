import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    // Fetch users when the component mounts
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleRefresh = () => {
    // Refresh the list of users
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const incrementSteps = () => {
    axios.post('http://localhost:8000/api/steps', { steps: steps + 1 })
      .then(response => {
        setSteps(response.data.map(step => step.steps).reduce((a, b) => a + b, 0));
      })
      .catch(error => {
        console.error('Error adding step:', error);
      });
  };

  return (
    <div>
      <h1>User List</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul> 
      <div>
        <h2>Fitness Tracker</h2>
        <button onClick={incrementSteps}>Add Step</button>
        {steps >= 10 && <p>You've reached your step goal!</p>}
      </div>
    </div>
  );
};

export default App;

