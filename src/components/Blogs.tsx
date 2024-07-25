import React, { useState, useEffect, useCallback } from 'react';
import { BlogPost } from '../types';
import BlogsItem from './BlogsItem';
import { useNavigate } from 'react-router-dom';
import useCreateLike from '@/hooks/useCreateLike';
import useCheckLike from '@/hooks/useCheckLike';
import { useAuthContext } from '@/context/authContext';
import AuthModal from './AuthModal';
import { Like } from '../types';
import useCreateView from '@/hooks/useCreateView';

interface BlogsProps {
    posts: BlogPost[];
}

const Blogs: React.FC<BlogsProps> = ({ posts }) => {
    const navigate = useNavigate();

    const {authUser} = useAuthContext()

    const { CreateLikeErrMessage, CreateLikes } = useCreateLike();
    const { CheckLikeErrMessage, checkLikeStatus } = useCheckLike();
    const {CreateViewErrMessage,CreateViews} = useCreateView()

    const [isModalVisible, setIsModalVisible] = useState(false);
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
                    userId: authUser?.userId! 
                };

                const isLiked = await checkLikeStatus(req);
                likedPostsStatus[post.id] = isLiked;
            }
            setLikedPosts(likedPostsStatus);
        };

        fetchLikesStatus();
    }, [posts]);

    const handleLike =  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, blogId: string) => {
        e.preventDefault()

        if(!authUser?.userId) {
            openModal()
            return
        }

        const req: Like = {
            blogId: blogId,
            userId: authUser.userId 
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

        CreateLikes(req);
    };

    const handleClick = useCallback((blogId: string) => {
        navigate(`/blog/${blogId}`);
        CreateViews(blogId)
    }, [navigate]);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    if (CheckLikeErrMessage || CreateLikeErrMessage || CreateViewErrMessage) {
        return <div>Error: {CheckLikeErrMessage || CreateLikeErrMessage || CreateViewErrMessage}</div>;
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[100px] px-1 md:px-15 lg:px-32 gap-y-8">
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
            <AuthModal isVisible={isModalVisible} onClose={closeModal} />
        </div>
    );
};

export default Blogs;
