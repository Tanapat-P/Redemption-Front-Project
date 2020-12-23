import React from 'react';
import { useState, useEffect } from 'react';
import axios from './config/axios';
import LocalStorageService from './services/LocalStorageService';
import PrivateRoutes from './Route/PrivateRoutes';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [role, setRole] = useState(LocalStorageService.getRole());

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('/users/me')
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [role]);

  return (
    <div className="App">
      <PrivateRoutes role={role} setRole={setRole} user={user} />
    </div>
  );
}

export default App;
