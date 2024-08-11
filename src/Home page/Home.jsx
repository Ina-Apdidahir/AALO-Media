
import React, { useState, useEffect } from 'react';
import client from '../../sanity_client/sanityClient' // Import your client

import { Link } from 'react-router-dom';

import styles from './Home.module.css'

function Home() {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        client.fetch(
            `
            *[_type == "post"] | order(_createdAt desc){
            title,
            slug,
            body,
            mainImage {
            asset -> {
            _id,
            url
            },
            alt
            },
            }

            `
        )
            .then((data) => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, [])

    const lastPost = posts[0];
    const otherPosts = posts.slice(1, 5);

    if (isLoading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching posts: {error.message}</div>;
    }

    if (!posts.length) {
        return <div>No posts found</div>;
    }




    return (
        <div className={styles.container}>

            <div className={styles.sub_container}>
                <div className={styles.stories}>


                    <div className={styles.story_1} >
                        <div className={styles.story_1_image}>
                            <img src={lastPost.mainImage.asset.url} alt="" />
                        </div>
                        <div className={styles.sub_title}>
                            <h4 className={styles.sub_title_txt}>
                                <Link to={`/detail/${lastPost.slug.current}`}>{lastPost.title}</Link>
                            </h4>
                        </div>
                    </div>

                    <div className={styles.Sidestories}>
                        {otherPosts.map((post) => (
                            <div className={styles.story} key={post.slug.current} >
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

                </div>

            </div>

        </div >
    );

}

export default Home


