
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Menue from '../assets/My_Blog_Images/menubtn.png'
import close from '../assets/My_Blog_Images/close.png'
import Logo from '../assets/My_Blog_Images/AALO.png'
import search from '../assets/My_Blog_Images/search.png'

import style from './Header.module.css'

function HeadSection() {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [showNav, setShowNav] = useState(false);
    const [showsearch, setShowSearch] = useState(false);

    const handleMenuClick = () => {
        setShowNav(true);
    };

    const handleCloseClick = () => {
        setShowNav(false);
    };

    const handleSeaerchClick = () => {
        setShowSearch(true);
    };

    const handleSearchClose = () => {
        console.log("clicked")
        setShowSearch(false);
    }

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
                    <div className={style.searchBtn}>
                        <img onClick={handleSeaerchClick} id={style.search} src={search} alt="" />
                    </div>
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
                                <li><Link to="/news">Politics</Link></li>
                                <li><Link to="/sports">Sportrs</Link></li>
                                <li><Link to="/calture">Culture</Link></li>
                                <li><Link to="/climate">Climate</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={`${style.search_side} ${showsearch ? style.search_show : ''}`}>
                    <div className={style.close}>
                        <img className={style.search__close} src={close} onClick={handleSearchClose}></img>
                    </div>
                    <form action="" className={style.search__form}>
                        <img className={style.search_icon} src={search} alt="" />
                        <input type="search" placeholder="What are you looking for?" className={style.search__input} id="search_input" />
                    </form>
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
                            <li><Link to="/news">Politics</Link></li>
                            <li><Link to="/sports">Sportrs</Link></li>
                            <li><Link to="/calture">Culture</Link></li>
                            <li><Link to="/climate">Climate</Link></li>
                        </ul>
                    </div>
                    <div className={style.icons}>
                        <div className={style.searchBtn}>
                            <img onClick={handleSeaerchClick} id={style.search} src={search} alt="" />
                        </div>
                    </div>
                    <div className={`${style.search_side} ${showsearch ? style.search_show : ''}`}>
                        <div className={style.close}>
                            <img className={style.search__close} src={close} onClick={handleSearchClose}></img>
                        </div>
                        <form action="" className={style.search__form}>
                            <img className={style.search_icon} src={search} alt="" />
                            <input type="search" placeholder="What are you looking for?" className={style.search__input} id="search_input" />
                        </form>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default HeadSection