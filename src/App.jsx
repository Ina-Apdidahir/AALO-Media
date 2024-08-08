
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import LandingPage from './Landing page/LandingPage';
import Details from './Details page/Details.jsx';


// import LatestNews from './Latest Posts/LatestNews.jsx';
// import About from './About section/About.jsx';
// import Sports from './Sports Section/Sports.jsx'
// import Climate from './Climate Section/Climate.jsx';
// import Calture from './Culture section/Calture.jsx';
// import Category from './Category Page/Category.jsx';

function App() {

  return (
    <>
 
      <BrowserRouter basename="/AALO-Media">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/detail/:slug" element={<Details />} />
        </Routes>
      </BrowserRouter>
   
      {/* <HeadSection />
      <Home /> */}
    </>
  )
}

export default App


{/* <Route path="/about" element={<About />} />

<Route path='/news'   element={<LatestNews />} />
<Route path="/sports" element={<Sports />} />
<Route path="/calture" element={<Calture />} />
<Route path="/climate" element={<Climate />} />
<Route path="/category/:slug" element={<Category />} /> */}