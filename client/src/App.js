import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [steps, setSteps] = useState(0); // Define 'steps' state here

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
    setSteps(steps + 1); // Define 'incrementSteps' function here
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
        <p>Steps Today: {steps}</p>
        <button onClick={incrementSteps}>Add Step</button>
        {steps >= 10 && <p>You've reached your step goal!</p>}
      </div>
    </div>
  );
};

export default App;