import React from 'react'
import Home from './Pages/Home'
import NavBar from './Components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import UserDetails from './Pages/UserDetails';
import Dashboard from './Pages/Dashboard';
import DashboardHome from "./Pages/DashboardHome";
import Weight from "./Pages/Weight";
import Water from "./Pages/Water";
import Steps from "./Pages/Steps";
import BMI from "./Pages/BMI";
import Goals from "./Pages/Goals";
import './App.css';
import Profile from './Pages/Profile';

const App = () => {
  return (
    <>

    <BrowserRouter>
    {/* <NavBar/> */}
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/signup" element = {<Signup/>}/>
      <Route path= "/userDetails" element = {<UserDetails/>}/>
      <Route path="/dashboard" element={<Dashboard />}>
      <Route index element={<DashboardHome />} />
      <Route path="weight" element={<Weight />} />
      <Route path="water" element={<Water />} />
      <Route path="steps" element={<Steps />} />
      <Route path="bmi" element={<BMI />} />
      <Route path="goals" element={<Goals />} />
      </Route>
      <Route path="/profile" element = {<Profile/>}/> 
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App