
import React, { useState, useEffect } from 'react';
import client from '../../sanity_client/sanityClient' // Import your client
import { Link } from 'react-router-dom';

import styles from './politics.module.css'
import whiteArrow from '../assets/My_Blog_Images/whiteArrow.png'


function Politics(){
    const [politicposts, setPoliticposts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
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
                setPoliticposts(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, [])


    const filteredPosts = politicposts.filter(post => post.categories?.some(category => category.title === 'Politics'));


    const lastPost = filteredPosts[0];
    const otherPosts = filteredPosts.slice(1, 5);


    if (error) {
        return <div>Error fetching posts: {error.message}</div>;
    }

    if (!politicposts.length) {
        return <div>No posts found</div>;
    }





    return (
        <div className={styles.container}>

            <div className={styles.sub_container}>
                <div className={styles.section}>
                    <h1>Politics</h1>
                    <button>
                        <Link to={`/category/${lastPost.categories?.map(category => category.slug.current)}`}>
                            see more <img src={whiteArrow} alt="" />
                        </Link>
                    </button>
                </div>
                <div className={styles.stories}>


                    <div className={styles.story_1} >
                        <div className={styles.image}>
                            {lastPost && lastPost.mainImage ? (
                                <img src={lastPost.mainImage.asset.url} alt="" />
                            ) : ''}
                        </div>
                        <div className={styles.sub_title}>
                            <h4 className={styles.sub_title_txt}>
                                <Link to={`/detail/${lastPost?.slug.current}`}>{lastPost?.title}</Link>
                            </h4>
                        </div>
                    </div>

                    {otherPosts && otherPosts.length > 0 ? (
                        <div className={styles.Sidestories}>
                            {otherPosts.map((post, index) => (
                                <div className={styles.story} key={index} >
                                    <div className={styles.image}>
                                        <img src={post.mainImage.asset.url} alt="" />
                                    </div>
                                    <div className={styles.sub_title}>
                                        <h4 className={styles.sub_title_txt}>
                                            <Link to={`/detail/${post.slug.current}`}>{post.title}</Link>
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : ''}

                </div>
            </div>

        </div >
    );
}

export default Politics