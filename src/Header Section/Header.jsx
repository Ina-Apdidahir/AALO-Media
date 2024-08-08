
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Menue from '../assets/blogImages/menubtn.png'
import close from '../assets/blogImages/close.png'
// import Menue from '../assets/Icons/menubtn.png'
// import close from '../assets/Icons/close.png'
import Logo from '../assets/blogImages/AALO.png'

import style from './Header.module.css'

function HeadSection() {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [showNav, setShowNav] = useState(false);

    const handleMenuClick = () => {
        setShowNav(true);
    };

    const handleCloseClick = () => {
        setShowNav(false);
    };

    //   ////////////////////////////   SCROLL FUNCTION    // ////////////////// 

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on route change
    }, [location]);

    // ///////////////////////////   SCROLL FUNCTION    // ////////////////// 

    return (
        <div className={style.container}>
            <div className={style.new_header}>
                <div className={style.user_actions}>
                    <button className={style.orederbutton}>Order Now</button>
                </div>
                <div className={style.logo_side} >
                    <img src={Logo} alt=""></img>
                    <p> Media</p>
                </div>
                <div className={style.user_actions}>
                    <div className={style.menueBtn}>
                        <img onClick={handleMenuClick} src={Menue} alt="" id={style.menue}></img>
                    </div>
                </div>

                <div className={`${style.Nav_side} ${showNav ? style.show_nav : ''}`}
                    id={style.Nav_side}>
                    <div className={style.close}>
                        <img onClick={handleCloseClick} src={close} alt="" id={style.close}></img>
                    </div>
                    <div className={style.Nav_classes}>
                        <div className={style.Nav_side_menue}>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/news">Politics</Link></li>
                                <li><Link to="/sports">Sportrs</Link></li>
                                <li><Link to="/calture">Culture</Link></li>
                                <li><Link to="/climate">Climate</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${style.head_cont} ${isSmallScreen ? style.hide_head_cont : ''}`}>
                <header>
                    <div className={style.logo_side} >
                        <img src={Logo} alt=""></img>
                        <p> Media</p>
                    </div>
                    <div className={style.nav_menue}>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/news">Politics</Link></li>
                            <li><Link to="/sports">Sportrs</Link></li>
                            <li><Link to="/calture">Culture</Link></li>
                            <li><Link to="/climate">Climate</Link></li>
                        </ul>
                    </div>
                    <div className={style.icons}>
                        <div className={style.user_actions}>
                            <button className={style.orederbutton}>Order Now</button>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default HeadSection