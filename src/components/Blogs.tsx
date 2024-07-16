import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { AiFillLike } from 'react-icons/ai';
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

    // Initialize local state to keep track of likes and liked status
    const [likes, setLikes] = useState<{ [key: string]: number }>(() => {
        const initialLikes: { [key: string]: number } = {};
        posts.forEach(post => {
            initialLikes[post.id] = post.like.length;
        });
        return initialLikes;
    });

    useEffect(() => {
        const fetchLikesStatus = async () => {
            const likedPostsStatus: { [key: string]: boolean } = {};
            for (const post of posts) {
                const req: Like = {
                    blogId: post.id,
                    userId: 'c909703c-6d2c-4bde-8515-db49825d3b6a' // Replace with actual userId
                };

                const isLiked = await checkLikeStatus(req);
                likedPostsStatus[post.id] = isLiked;
            }
            // console.log(likedPostsStatus, "GINI SIH")
            setLikedPosts(likedPostsStatus);
        };

        fetchLikesStatus();
    }, [posts]);

    const [likedPosts, setLikedPosts] = useState<{ [key: string]: any }>({});

    const trimTag = (tag: string): string => {
        return tag.replace(/^"(.*)"$/, '$1');
    };

    const handleClick = (blogId: string) => {
        navigate(`/blog/${blogId}`);
    };

    const handleLike = async (blogId: string) => {
        const req: Like = {
            blogId: blogId,
            userId: 'c909703c-6d2c-4bde-8515-db49825d3b6a' // Replace with actual userId
        };

        const isLiked = likedPosts[blogId];

        // Optimistically update the local state
        if (isLiked) {
            // If already liked, decrement the like count
            setLikes(prevLikes => ({
                ...prevLikes,
                [blogId]: prevLikes[blogId] - 1
            }));
        } else {
            // If not liked, increment the like count
            setLikes(prevLikes => ({
                ...prevLikes,
                [blogId]: prevLikes[blogId] + 1
            }));
        }

        // Toggle liked status in local state
        setLikedPosts(prevLikedPosts => ({
            ...prevLikedPosts,
            [blogId]: !isLiked
        }));

        // Update the like status on the server using CreateLikes function
        await CreateLikes(req);
    };

    

    if (CreateLikeLoading || CheckLikeLoading) {
        return <div>Loading...</div>;
    }

    if (CheckLikeErrMessage || CreateLikeErrMessage) {
        return <div>Error: {CheckLikeErrMessage || CreateLikeErrMessage}</div>;
    }

    const cek = likedPosts['1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'] as any
    console.log(cek, "GINISIH")

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[100px] px-10 md:px-15 lg:px-32 gap-y-8">
            {likedPosts && posts.map((item: BlogPost) => (
                <div key={item.id} className="m-4 cursor-pointer max-w-[420px]">
                    <img
                        src={item.imageUrl}
                        className="w-full rounded-2xl object-cover h-[200px]"
                    />
                    <div className="min-h-[144px]" onClick={() => handleClick(item.id)}>
                        <h3 className="text-red-500 mt-3">
                            {trimTag(item.tag)}
                        </h3>
                        <h3 className="font-bold mt-3">{item.title}</h3>
                        <h3 className="line-clamp-3 text-gray-400 mt-3">
                            {item.content}
                        </h3>
                    </div>
                    <div className="flex items-center mt-5">
                        <img
                            src={item.user.imageUrl}
                            className="w-[35px] h-[35px] rounded-full"
                        />
                        <div className="flex items-center justify-between w-full">
                            <div className="ml-2">
                                <h3 className="font-bold text-[12px]">
                                    {item.user.name}
                                </h3>
                                <h3 className="text-gray-500 text-[10px]">
                                    {item.createdAt}
                                </h3>
                            </div>
                            <div className="ml-3 mb-3 flex mt-6 cursor-pointer items-center" onClick={() => handleLike(item.id)}>
                                <AiFillLike size={'1.5rem'} className={`hover:text-purpleCustom ${likedPosts[item.id] ? 'text-purpleCustom':'text-gray-300'}`} />
                                <span className="ml-2 text-sm mt-1">
                                    {likes[item.id]}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Blogs;
