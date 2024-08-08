
import React, { useState, useEffect } from 'react';
import client from '../../sanity_client/sanityClient';
import { Link, useParams } from 'react-router-dom';

import HeadSection from '../Header Section/Header'
import styles from './Category.module.css'

import next from '../assets/My_Blog_Images/Wnext.png'
import Previous from '../assets/My_Blog_Images/WPrevious.png'

function Category() {


    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams(); // Get the slug from the URL parameters

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6; // Adjust this value as needed

    useEffect(() => {
        const query = `*[ _type == "post"  ] | order(_createdAt desc) {
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
              title,
              slug
            },
            subcategories[]->{
              title,
              slug
            },
            "author": author->name
        }`;

        client.fetch(query)
            .then((data) => {
                // Filter posts based on subcategory slug in your component
                const filteredPosts = data.filter(post => {
                    return (
                        (post.subcategories && post.subcategories.some(sub => sub.slug.current === slug)) ||
                        (post.categories && post.categories.some(cat => cat.slug.current === slug))
                    );
                });


                setCategory(filteredPosts);

                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError(err);
                setIsLoading(false);
            });
    }, [slug]);




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


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = category.slice(indexOfFirstPost,
        indexOfLastPost);

    const totalPages = Math.ceil(category.length / postsPerPage);


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




    return (
        <div className={styles.container}>
            <HeadSection />
            <div className={styles.posts_container}>

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

                                    <div className={styles.post_category}>

                                        {post.subcategories ? (
                                            <Link to={`/category/${post.subcategories?.map(category => category.slug.current)}`}>
                                                <p className={styles.category}>{post.subcategories.map(category => category.title).join(',')}</p>
                                            </Link>
                                        ) : (
                                            <Link to={`/category/${post.categories?.map(category => category.slug.current)}`}>
                                                <p className={styles.category}>{post.categories.map(category => category.title).join(',')}</p>
                                            </Link>
                                        )}

                                    </div>

                                    <div className={styles.Aouthor_date}>
                                        <div className={styles.post_date}>
                                            <small>{formatDate(post.publishedAt)}</small>
                                        </div>
                                        <div className={styles.post_Author}>
                                            <p>{post.author}</p>
                                        </div>
                                    </div>

                                    <div className={styles.post_title}>
                                        <p>
                                            {post.title}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.post_btn}>
                                    <button><Link to={`/detail/${post.slug.current}`}>Read more</Link></button>
                                </div>

                            </div>
                        ))
                    ) : (<div>No posts found</div>)}

                </div>
                {currentPosts && currentPosts.length > 0 ? (
                    <div className={styles.paginations} >{renderPaginationButtons()}</div>
                ) : ''}
            </div>
        </div>
    )
}

export default Category