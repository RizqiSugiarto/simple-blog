import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGetBlogById from '@/hooks/useGetById';
import convertDate from '@/utils/convertDate';

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { GetBlogByIdLoading, GetBlogByIdErrMessage, BlogById, getBlogById } =
        useGetBlogById();

    useEffect(() => {
        if (id) {
            getBlogById(id);
        }
    }, []);

    if (GetBlogByIdLoading) {
        return <p>Loading...</p>;
    }

    if (GetBlogByIdErrMessage) {
        return <p>Error: {GetBlogByIdErrMessage}</p>;
    }

    if (!BlogById) {
        return <p>No blog found</p>;
    }

    console.log(BlogById, "MASA GINI")

    return (
        <div className="flex justify-center mt-12">
            <div className="md:w-[680px] w-[400px]">
                <img
                    src={BlogById.imageUrl}
                    className="rounded-2xl mt-5 mb-5 w-full md:h-[300px] max-h-64"
                />
                <h3 className="text-red-500 text-sm">{BlogById.tag}</h3>
                <h3 className="text-[23px] font-bold">{BlogById.title}</h3>
                <div className="mt-5">
                    <div>
                        <img
                            src={BlogById.user.ImageUrl}
                            className="w-[50px] rounded-full"
                        />
                        <div className="ml-2 mt-4">
                            <h3 className="font-bold text-[12px]">
                                {BlogById.user.name}
                            </h3>
                            <h3 className="text-gray-500 text-[10px]">
                                {convertDate(BlogById.createdAt)}
                            </h3>
                        </div>
                    </div>
                    <hr className="w-28 mt-3" />
                </div>
                <div className="flex mt-6">
                    <h3>{BlogById.content}</h3>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
