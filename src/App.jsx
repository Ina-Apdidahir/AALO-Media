
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import LandingPage from './Landing page/LandingPage';
import Details from './Details page/Details.jsx';
import LatestNews from './Latest Posts/LatestNews.jsx';
import Category from './Category Page/Category.jsx';
import Sports from './Sports Section/Sports.jsx'
import Climate from './Climate Section/Climate.jsx';
import Calture from './Culture section/Calture.jsx';

import postsData from './Header Section/FiltetredPosts.jsx'


function App() {

  return (
    <>

      <BrowserRouter basename="/AALO-Media">
        <Routes>
          <Route path="/" element={<LandingPage posts={postsData} />} />
          <Route path="/detail/:slug" element={<Details />} />
          <Route path='/news' element={<LatestNews />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/calture" element={<Calture />} />
          <Route path="/climate" element={<Climate />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


