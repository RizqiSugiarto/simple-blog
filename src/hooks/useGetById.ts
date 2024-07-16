import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetBlogByIdProps {
    GetBlogByIdLoading: boolean;
    GetBlogByIdErrMessage: string;
    BlogById: any;
    getBlogById: (blogId: string) => Promise<void>;
}

const useGetBlogById = (): UseGetBlogByIdProps => {
    const [GetBlogByIdLoading, setGetBlogByIdLoading] = useState(false);
    const [GetBlogByIdErrMessage, setGetBlogByIdErrMessage] = useState('');
    const [BlogById, setBlogById] = useState(null);

    const getBlogById = async (blogId: string): Promise<void> => {
        setGetBlogByIdLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/blogs/${blogId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch blogs');
            }

            const data = await response.json();
            setBlogById(data);
        } catch (error: any) {
            setGetBlogByIdErrMessage(error.message);
        } finally {
            setGetBlogByIdLoading(false);
        }
    };

    return { GetBlogByIdLoading, GetBlogByIdErrMessage, BlogById, getBlogById };
};

export default useGetBlogById;
