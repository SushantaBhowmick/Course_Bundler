import React, { useEffect } from 'react';
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
import UpdateProfile from './components/Profile/UpdateProfile';
import ChanagePassword from './components/Profile/ChanagePassword';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import User from './components/Admin/User/User';
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from 'react-hot-toast'
import { loadUser } from './redux/actions/userAction';

function App() {

  window.addEventListener('contextmenu',e=>{
    e.preventDefault();
  })

  const {isAuthenticated,user,error,message} = useSelector(state=>state.user)

  const dispatch = useDispatch()

  useEffect(()=>{
    if (error) {
      toast.error(error)
      dispatch({type:'clearError'});
    }
    if (message) {
      toast.success(message)
      dispatch({type:'clearMessage'});
    }
  },[dispatch,error,message])

useEffect(()=>{
  dispatch(loadUser())
},[dispatch])

  return (
    <Router>
      <Routes>
       <Route path='/' element={<Layout />}>
       <Route path='' element={<Home />} />
       <Route path='courses' element={<Courses />} />
       <Route path='course/:id' element={<CourseDetails />} />
       <Route path='login' element={<Login />} />
       <Route path='profile' element={<Profile />} />
       <Route path='updateprofile' element={<UpdateProfile />} />
       <Route path='changepassword' element={<ChanagePassword />} />
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

       {/* Admin Routes */}
       <Route path='admin/dashboard' element={<Dashboard />} />
       <Route path='admin/createcourse' element={<CreateCourse />} />
       <Route path='admin/courses' element={<AdminCourses />} />
       <Route path='admin/users' element={<User />} />

       </Route>
      </Routes>
       <Toaster />  
    </Router>
    );
}

export default App;
