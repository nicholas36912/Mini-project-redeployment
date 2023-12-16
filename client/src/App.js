import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkoutsComponent from './WorkoutsComponent'; // Import your Workout component
import NutritionsComponent from './NutritionsComponent'; // Import your Nutrition component
import GoalsComponent from './GoalsComponent'; // Import your Goal component

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWorkouts, setShowWorkouts] = useState(false);
  const [showNutritions, setShowNutritions] = useState(false);
  const [showGoals, setShowGoals] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    axios.get('/user')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, []);

  const handleRegister = () => {
    axios.post('/register', { username, email, password })
      .then(response => {
        console.log('Registration successful:', response.data);
      })
      .catch(error => {
        console.error('Error registering user:', error.response.data);
      });
  };

  const handleLogin = () => {
    axios.post('/login', { username, password })
      .then(response => {
        console.log('Login successful:', response.data);
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error logging in:', error.response.data);
      });
  };

  const handleLogout = () => {
    axios.get('/logout')
      .then(response => {
        console.log('Logout successful:', response.data);
        setUser(null);
      })
      .catch(error => {
        console.error('Error logging out:', error.response.data);
      });
  };

  const handleFetchWorkouts = () => {
    axios.get('http://localhost:3000/workouts')
      .then(response => {
        // Handle fetched data as needed
        setShowWorkouts(true);
        setShowNutritions(false);
        setShowGoals(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      <button onClick={handleFetchWorkouts}>Fetch Workouts</button>

      {/* Render workout, nutrition, and goal components based on state */}
      {showWorkouts && <WorkoutsComponent />}
      {showNutritions && <NutritionsComponent />}
      {showGoals && <GoalsComponent />}
    </div>
  );
};

export default App;
