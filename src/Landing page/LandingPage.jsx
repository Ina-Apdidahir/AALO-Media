import React, {useState, useEffect} from 'react';
import HeadSection from "../Header Section/Header.jsx";
import Home from "../Home page/Home.jsx";
import Politics from "../Politics section/politics.jsx";
import SportsSection from "../Sports Section/Sports_Section.jsx";
import Calture_Section from "../Culture section/Culture_sec.jsx";
import ClimateSection from "../Climate Section/Climate_Section.jsx";
import Bottom_Foter from '../Footer section/Bottom_Foter';


function LandingPage() {

    return (
        <>
            <HeadSection /> 
            <Home />
            <Politics />
            <SportsSection />
            <Calture_Section />
            <ClimateSection />
            <Bottom_Foter />
        </>
    );
}

export default LandingPage;
