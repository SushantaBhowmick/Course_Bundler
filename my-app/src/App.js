import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
       <Route path='/' element={<Layout />}>
       <Route path='' element={<Home />} />
       </Route>
      </Routes>
    </Router>
    );
}

export default App;
