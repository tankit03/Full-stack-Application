import { useEffect, useState } from 'react'

import Home from './pages/Home'
import Agent from './pages/Agent'
import Property from './pages/Properties'
import PropertyFeature from './pages/PropertyFeature'
import PropertyComparison from './pages/PropertyComparison'
import Reviews from './pages/Reviews'
import User from './pages/User'
import Viewings from './pages/Viewings'

import './App.css'
import Axios from 'axios'
import Navbar from './Navbar'
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
  
    <>
      <Navbar />
        <div className="Container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agent" element={<Agent />} />
            <Route path="/properties" element={<Property />} />
            <Route path="/property-features" element={<PropertyFeature />} />
            <Route path="/Property-Comparison" element={<PropertyComparison/>} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/user" element={<User />} />
            <Route path="/viewings" element={<Viewings />} />
          </Routes>
        </div>
      


    
    </>
  )
}

export default App
