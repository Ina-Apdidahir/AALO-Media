
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import LandingPage from './Landing page/LandingPage';

function App() {

  return (
    <>
 
      <BrowserRouter basename="/AALO-Media">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
   
      {/* <HeadSection />
      <Home /> */}
    </>
  )
}

export default App


{/* <Route path="/about" element={<About />} />
<Route path="/detail/:slug" element={<Details />} />
<Route path='/news'   element={<LatestNews />} />
<Route path="/sports" element={<Sports />} />
<Route path="/calture" element={<Calture />} />
<Route path="/climate" element={<Climate />} />
<Route path="/category/:slug" element={<Category />} /> */}