import React, { useState, useEffect, useCallback } from 'react';
import { BlogPost } from '../types';
import BlogsItem from './BlogsItem';
import { useNavigate } from 'react-router-dom';
import useCreateLike from '@/hooks/useCreateLike';
import useCheckLike from '@/hooks/useCheckLike';
import { Like } from '../types';

interface BlogsProps {
    posts: BlogPost[];
}

const Blogs: React.FC<BlogsProps> = ({ posts }) => {
    const navigate = useNavigate();
    const { CreateLikeErrMessage, CreateLikeLoading, CreateLikes } = useCreateLike();
    const { CheckLikeLoading, CheckLikeErrMessage, checkLikeStatus } = useCheckLike();

    const [likes, setLikes] = useState<{ [key: string]: number }>(() => {
        const initialLikes: { [key: string]: number } = {};
        posts.forEach(post => {
            initialLikes[post.id] = post.liked.length;
        });
        return initialLikes;
    });

    const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchLikesStatus = async () => {
            const likedPostsStatus: { [key: string]: boolean } = {};
            for (const post of posts) {
                const req: Like = {
                    blogId: post.id,
                    userId: 'c909703c-6d2c-4bde-8515-db49825d3b6a' // Replace with actual userId
                };
                const isLiked = await checkLikeStatus(req);
                console.log(isLiked, "DAPET")
                likedPostsStatus[post.id] = isLiked;
            }
            setLikedPosts(likedPostsStatus);
        };

        fetchLikesStatus();
    }, [posts]);

    const handleLike =  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, blogId: string) => {
        e.preventDefault()
        const req: Like = {
            blogId: blogId,
            userId: 'c909703c-6d2c-4bde-8515-db49825d3b6a' // Replace with actual userId
        };

        const isLiked = likedPosts[blogId];

        // Optimistically update the local state
        setLikes(prevLikes => ({
            ...prevLikes,
            [blogId]: prevLikes[blogId] + (isLiked ? -1 : 1)
        }));

        // Toggle liked status in local state
        setLikedPosts(prevLikedPosts => ({
            ...prevLikedPosts,
            [blogId]: !isLiked
        }));

        // Update the like status on the server using CreateLikes function
        CreateLikes(req);
    };

    const handleClick = useCallback((blogId: string) => {
        navigate(`/blog/${blogId}`);
    }, [navigate]);

    // if (CreateLikeLoading || CheckLikeLoading) {
    //     return <div>Loading...</div>;
    // }

    if (CheckLikeErrMessage || CreateLikeErrMessage) {
        return <div>Error: {CheckLikeErrMessage || CreateLikeErrMessage}</div>;
    }

    console.log(likedPosts, "GINI")

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[100px] px-10 md:px-15 lg:px-32 gap-y-8">
            {posts.map((post: BlogPost) => (
                <BlogsItem
                    key={post.id}
                    post={post}
                    likes={likes[post.id]}
                    liked={likedPosts[post.id]}
                    onLike={handleLike}
                    onClick={handleClick}
                />
            ))}
        </div>
    );
};

export default Blogs;
