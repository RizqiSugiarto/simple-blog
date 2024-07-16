import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetBlogsByTagsProps {
    GetBLogsByTagLoading: boolean;
    GetBLogsByTagErrorMessage: string;
    BlogsByTags: any;
    getBlogsByTags: (tag: string) => Promise<void>;
}

const useGetBlogsByTags = (): UseGetBlogsByTagsProps => {
    const [GetBLogsByTagLoading, setGetBLogsByTagLoading] = useState(false);
    const [GetBLogsByTagErrorMessage, setGetBLogsByTagErrorMessage] =
        useState('');
    const [BlogsByTags, setBlogsByTags] = useState([]);

    const getBlogsByTags = async (tag: string): Promise<void> => {
        setGetBLogsByTagLoading(true);

        try {
            const response = await fetch(`${BaseUrl}/blogs/tags?tag=${tag}`, {
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
            setBlogsByTags(data);
        } catch (error: any) {
            setGetBLogsByTagErrorMessage(error.message);
        } finally {
            setGetBLogsByTagLoading(false);
        }
    };

    return {
        GetBLogsByTagLoading,
        GetBLogsByTagErrorMessage,
        BlogsByTags,
        getBlogsByTags
    };
};

export default useGetBlogsByTags;
