import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';


const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setAlert] = useState(null);
  

  // Search Github Users
  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    
    setUsers(res.data.items);
    setLoading(false);
    
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const showAlert = (msg, type) => { 
    setAlert({msg, type});

    setTimeout(() => setAlert(null), 3500)
  }
  

    return (
      <>
        <nav className="navbar bg-primary">
          <Navbar title="Github Finder"/> 
        </nav> 
    
      <div className='container'>
        <Alert alert={alert} />
        <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length > 0 ? true : false} setAlert={showAlert}/>
        <Users loading={loading} users={users} />
      </div>
      
    
  
    </>
  );

}

export default App;
