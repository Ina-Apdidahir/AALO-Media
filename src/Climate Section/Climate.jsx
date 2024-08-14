
import React, { useState, useEffect, useRef } from 'react';
import client from '../../sanity_client/sanityClient';
import { Link } from 'react-router-dom';

import next from '../assets/My_Blog_Images/Wnext.png'
import Previous from '../assets/My_Blog_Images/WPrevious.png'

import HeadSection from '../Header Section/Header'
import styles from './Climate.module.css'

function Climate() {

    // ___________________ Scroll Animation _____________________\\

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    } else {
                        entry.target.classList.remove(styles.visible);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const observeElements = () => {
            const elements = document.querySelectorAll(`.${styles.Scale}`);
            // console.log("Elements found:", elements.length);
            elements.forEach((el) => observer.observe(el));

            const lefslide = document.querySelectorAll(`.${styles.lefslide}`);
            lefslide.forEach((el) => observer.observe(el));

            const rightslide = document.querySelectorAll(`.${styles.rightslide}`);
            rightslide.forEach((el) => observer.observe(el));
        };

        observeElements(); // Initial run
        const observerMutation = new MutationObserver(observeElements);
        observerMutation.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            observerMutation.disconnect();
        };
    }, []);

    // ___________________ Scroll Animation _____________________\\

    const [blogPosts, setBlogPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');  // Default category 

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6; // Adjust this value as needed



    useEffect(() => {
        const fetchPosts = async () => {
            const query = `*[ _type == "post"] | order(_createdAt desc) {
              title,
              body,
              slug,
              mainImage {
                asset -> {
                  _id,
                  url
                },
                alt
              },
              publishedAt,
              categories[]->{
                title
              },
              subcategories[]->{
                title,
                slug
              },
              "author": author->name
            }`;

            try {
                const allPosts = await client.fetch(query);
                const politicsPost = allPosts.filter(post => post.categories?.some(sub => sub.title == "Climate"));
                setBlogPosts(politicsPost);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [])


    function formatDate(publishedAt) {
        if (!publishedAt) {
            return 'Date not available';
        }
        const date = new Date(publishedAt);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;
    }


    // const filteredPosts = blogPosts.filter(post => post.categories.some(category => category.title ));
    // console.log(filteredPosts)


    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset page to 1 when category changes
    };

    const filteredPosts = selectedCategory === 'all'
        ? blogPosts : blogPosts.filter(post => post.subcategories?.some(cat => cat.title === selectedCategory));

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost,
        indexOfLastPost);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const renderPaginationButtons = () => {
        if (totalPages === 1) return null; // No need for pagination if only 1 page

        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <p
                    key={i}
                    onClick={() => paginate(i)}
                    //disabled={currentPage !== i} // Disable non-current pages
                    className={`${styles.paginationNumber} ${currentPage === i ? styles.activePage : ''}`}
                >
                    {i}
                </p>
            );
        }

        return (
            <div className={styles.pagination}>
                <button disabled={currentPage === 1}
                    className={`${styles.paginationBtn} ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => paginate(currentPage - 1)}
                >
                    <img src={Previous} alt="" />
                    Previous
                </button>
                <div className={styles.pagination_pages}>
                    <div className={styles.pages}>{pageNumbers}</div>
                </div>
                <button disabled={currentPage === totalPages}
                    className={`${styles.paginationBtn} ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => paginate(currentPage + 1)}
                >
                    Next
                    <img src={next} alt="" />
                </button>
            </div>
        );
    };




    if (isLoading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching posts: {error.message}</div>;
    }

    if (!blogPosts.length) {
        return <div>No posts found</div>;
    }



    return (
        <div className={styles.container}>
            <HeadSection />
            <div className={styles.posts_container}>
                <div className={styles.filters}>
                    <button onClick={() => handleCategoryClick('all')}>All</button>
                    <button onClick={() => handleCategoryClick('Midle East')}>Middle East</button>
                    <button onClick={() => handleCategoryClick('Africa')}>Africa</button>
                    <button onClick={() => handleCategoryClick('America')}>America</button>
                    <button onClick={() => handleCategoryClick('Europe')}>Europe</button>
                    <button onClick={() => handleCategoryClick('Asia')}>Asia</button>
                </div>
                <div className={styles.posts}>

                    {currentPosts && currentPosts.length > 0 ? (

                        currentPosts.map((post, index) => (
                            <div className={styles.post} key={index}>
                                <div className={styles.post_image}>
                                    {post.mainImage && post.mainImage.asset && (
                                        <img src={post.mainImage.asset.url} alt={post.title} />
                                    )}
                                </div>
                                <div className={styles.post_txts}>

                                    <div className={` ${styles.post_category} ${styles.Scale} `}>
                                        <Link to={`/category/${post.subcategories?.map(category => category.slug.current)}`}>
                                            {post.subcategories ? (
                                                <p className={styles.category}>{post.subcategories.map(category => category.title).join(',')}</p>
                                            ) : (
                                                <p className={styles.category}>{post.categories.map(category => category.title).join(',')}</p>
                                            )}
                                        </Link>
                                    </div>

                                    <div className={styles.Aouthor_date}>
                                        <div className={styles.post_date}>
                                            <small className={styles.lefslide}>
                                                {formatDate(post.publishedAt)}
                                            </small>
                                        </div>
                                        <div className={styles.post_Author}>
                                            <p className={styles.rightslide}>
                                                {post.author}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.post_title}>
                                        <p>
                                            {post.title}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.post_btn}>
                                    <button className={styles.Scale}><Link to={`/detail/${post.slug.current}`}>Read more</Link></button>
                                </div>
                            </div>
                        ))

                    ) : (<p>There is no posts in this section {selectedCategory} </p>)}

                </div>

                {currentPosts && currentPosts.length > 5 ? (
                    <div className={styles.paginations} >{renderPaginationButtons()}</div>
                ) : ''}

            </div>
        </div>
    )


}

export default Climate