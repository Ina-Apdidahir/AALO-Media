import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchComponent from './FiltetredPosts.jsx'; // Adjust the path to your SearchComponent
import Menue from '../assets/My_Blog_Images/menubtn.png';
import close from '../assets/My_Blog_Images/close.png';
import Logo from '../assets/My_Blog_Images/AALO.png';
import search from '../assets/My_Blog_Images/search.png';
import style from './Header.module.css';

import {fetchPosts} from '../../sanity_client/fetch.js'

function HeadSection() {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);
    const [showNav, setShowNav] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const loadPosts = async () => {
          const fetchedPosts = await fetchPosts();
         // console.log('Fetched posts:', fetchedPosts); // Log fetched posts
          setPosts(fetchedPosts);
        };
    
        loadPosts();
      }, []);

      
    const handleMenuClick = () => setShowNav(true);
    const handleCloseClick = () => setShowNav(false);
    const handleSearchClick = () => setShowSearch(true);
    const handleSearchClose = () => setShowSearch(false);

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on route change
    }, [location]);

    return (
        <div className={style.container}>
            <div className={style.new_header}>
                <div className={style.user_actions}>
                    <div className={style.searchBtn}>
                        <img onClick={handleSearchClick} id={style.search} src={search} alt="" />
                    </div>
                </div>
                <div className={style.logo_side}>
                    <img src={Logo} alt="" />
                    <p>Media</p>
                </div>
                <div className={style.user_actions}>
                    <div className={style.menueBtn}>
                        <img onClick={handleMenuClick} src={Menue} alt="" id={style.menue} />
                    </div>
                </div>

                <div className={`${style.Nav_side} ${showNav ? style.show_nav : ''}`}>
                    <div className={style.close}>
                        <img onClick={handleCloseClick} src={close} alt="" id={style.close} />
                    </div>
                    <div className={style.Nav_classes}>
                        <div className={style.Nav_side_menue}>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/news">Politics</Link></li>
                                <li><Link to="/sports">Sports</Link></li>
                                <li><Link to="/calture">Culture</Link></li>
                                <li><Link to="/climate">Climate</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={`${style.search_side} ${showSearch ? style.search_show : ''}`}>
                    <SearchComponent   posts={posts}  showSearch={showSearch} handleSearchClose={handleSearchClose} />
                </div>
            </div>
            <div className={`${style.head_cont} ${isSmallScreen ? style.hide_head_cont : ''}`}>
                <header>
                    <div className={style.logo_side}>
                        <img src={Logo} alt="" />
                        <p>Media</p>
                    </div>
                    <div className={style.nav_menue}>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/news">Politics</Link></li>
                            <li><Link to="/sports">Sports</Link></li>
                            <li><Link to="/calture">Culture</Link></li>
                            <li><Link to="/climate">Climate</Link></li>
                        </ul>
                    </div>
                    <div className={style.icons}>
                        <div className={style.searchBtn}>
                            <img onClick={handleSearchClick} id={style.search} src={search} alt="" />
                        </div>
                    </div>
                    <div className={`${style.search_side} ${showSearch ? style.search_show : ''}`}>
                        <SearchComponent posts={posts}  showSearch={showSearch} handleSearchClose={handleSearchClose} />
                    </div>
                </header>
            </div>
        </div>
    );
}

export default HeadSection;
