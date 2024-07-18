import React from 'react';
import { useNavigate } from 'react-router-dom';
import convertDate from '@/utils/convertDate';
import useCreateView from '@/hooks/useCreateView';

interface IntroPostProps {
    post: any;
}

const IntroPost: React.FC<IntroPostProps> = ({ post }) => {
    const {CreateViews} = useCreateView()
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${post.id}`);
        CreateViews(post.id)
    };

    const trimTag = (tag: string): string => {
        return tag.replace(/^"(.*)"$/, '$1');
    };

    return (
        <div
            className="grid grid-cols-1 
     md:grid-cols-2 mt-10 md:px-15 lg:px-32 gap-8"
        >
            <img
                src={post.imageUrl}
                className="
        rounded-2xl object-cover w-full max-h-[250px] md:max-h-[313px] max-w-lg md:ml-auto"
            />
            <div className="cursor-pointer" onClick={handleClick}>
                <h4 className="text-red-500">{trimTag(post.tag)}</h4>
                {/* <div className='flex justify-between md:block'> */}
                <div className="md:min-h-48">
                    <h2 className="text-[23px] font-bold mt-5">{post.title}</h2>
                    <h4 className="line-clamp-6 text-gray-400 mt-5">
                        {post.content}
                    </h4>
                </div>
                <div className="flex items-center md:mt-5 mt-10">
                    <img
                        src={post.user.imageUrl}
                        className="w-[50px] h-[50px] rounded-full"
                    />
                    <div className="ml-2">
                        <h3 className="font-bold ">{post.user.name}</h3>
                        <h3 className="text-gray-500">
                            {convertDate(post.createdAt)}
                        </h3>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default IntroPost;
