import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { BlogPost } from '../types';
import convertDate from '@/utils/convertDate';

interface BlogItemProps {
    post: BlogPost;
    likes: number;
    liked: boolean;
    onLike: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,blogId: string) => void;
    onClick: (blogId: string) => void;
}

const BlogItem: React.FC<BlogItemProps> = ({ post, likes, liked, onLike, onClick }) => {
    const trimTag = (tag: string): string => {
        return tag.replace(/^"(.*)"$/, '$1');
    };

    return (
        <div className="md:m-4 cursor-pointer md:max-w-[420px] w-full">
            <img
                src={post.imageUrl}
                className="w-full rounded-2xl object-cover h-52 md:h-52"
                onClick={() => onClick(post.id)}
            />
            <div className="min-h-[144px]" onClick={() => onClick(post.id)}>
                <h3 className="text-red-500 mt-3">
                    {trimTag(post.tag)}
                </h3>
                <h3 className="font-bold mt-3">{post.title}</h3>
                <h3 className="line-clamp-3 text-gray-400 mt-3">
                    {post.content}
                </h3>
            </div>
            <div className="flex items-center mt-5">
                <img
                    src={post.user.ImageUrl}
                    className="w-[35px] h-[35px] rounded-full"
                />
                <div className="flex items-center justify-between w-full">
                    <div className="ml-2">
                        <h3 className="font-bold text-[12px]">
                            {post.user.name}
                        </h3>
                        <h3 className="text-gray-500 text-[10px]">
                            {convertDate(post.createdAt)}
                        </h3>
                    </div>
                    <button type="button" className="ml-3 mb-3 flex mt-6 cursor-pointer items-center" onClick={(e) => onLike(e,post.id)}>
                        <AiFillLike size={'1.5rem'} className={`hover:text-purpleCustom ${liked ? 'text-purpleCustom' : 'text-gray-300'}`} />
                        <span className="ml-2 text-sm mt-1">
                            {likes}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogItem;
