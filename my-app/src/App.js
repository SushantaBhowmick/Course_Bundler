import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Courses from './components/Courses/Courses';
import Login from './components/Auth/Login';

function App() {
  return (
    <Router>
      <Routes>
       <Route path='/' element={<Layout />}>
       <Route path='' element={<Home />} />
       <Route path='courses' element={<Courses />} />
       <Route path='login' element={<Login />} />
       </Route>
      </Routes>
    </Router>
    );
}

export default App;
