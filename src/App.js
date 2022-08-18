import React, { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Login, Signup } from './pages/auth';
import './App.css';
import { WelcomeVendor, Customers, AddRestaurant, EventDetails, Venues,VenueDetail } from './pages/vendor';
import { WelcomeAdmin } from './pages/admin';
import { Context } from './context';
import Navbarcomp from './component/Navbarcomp';
function App() {
  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState()
  return (

    <>
      {
        state.loggedInUser ?
          <Navbarcomp />
          : null
      }
      <Routes>

        {!state.loggedInUser ? (
          <>

            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )
          :
          <>
            <Route path="/" element={<WelcomeVendor />} />
            <Route path="/detail/:id" element={<EventDetails />} />
            <Route path="/customers" element={<Customers />} />

            <Route path="/addVenue" element={<AddRestaurant />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/venues/:id" element={<VenueDetail />} />

          </>
        }
        <Route path='*' element={<Navigate to={(!state.admin && state.loggedInUser) ? "/" : "/"} />} />


      </Routes>
    </>

  );
}

export default App;
