import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Courses from './components/Courses/Courses';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';

function App() {
  return (
    <Router>
      <Routes>
       <Route path='/' element={<Layout />}>
       <Route path='' element={<Home />} />
       <Route path='courses' element={<Courses />} />
       <Route path='login' element={<Login />} />
       <Route path='register' element={<Register />} />
       <Route path='forgotpassword' element={<ForgotPassword />} />
       <Route path='resetpassword/:token' element={<ResetPassword />} />
       <Route path='contact' element={<Contact />} />
       <Route path='request' element={<Request />} />
       <Route path='about' element={<About />} />
       </Route>
      </Routes>
    </Router>
    );
}

export default App;
