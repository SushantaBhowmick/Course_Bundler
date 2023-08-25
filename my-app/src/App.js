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
import SubScribe from './components/Payments/SubScribe';
import NotFound from './components/Payments/NotFound';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';
import CourseDetails from './components/CourseDetails/CourseDetails';
import Profile from './components/Profile/Profile';

function App() {

  window.addEventListener('contextmenu',e=>{
    e.preventDefault();
  })

  return (
    <Router>
      <Routes>
       <Route path='/' element={<Layout />}>
       <Route path='' element={<Home />} />
       <Route path='courses' element={<Courses />} />
       <Route path='course/:id' element={<CourseDetails />} />
       <Route path='login' element={<Login />} />
       <Route path='profile' element={<Profile />} />
       <Route path='register' element={<Register />} />
       <Route path='contact' element={<Contact />} />
       <Route path='request' element={<Request />} />
       <Route path='about' element={<About />} />
       <Route path='forgotpassword' element={<ForgotPassword />} />
       <Route path='resetpassword/:token' element={<ResetPassword />} />
       <Route path='subscribe' element={<SubScribe />} />
       <Route path='*' element={<NotFound />} />
       <Route path='paymentsuccess' element={<PaymentSuccess />} />
       <Route path='paymentfail' element={<PaymentFail />} />
       </Route>
      </Routes>
    </Router>
    );
}

export default App;
