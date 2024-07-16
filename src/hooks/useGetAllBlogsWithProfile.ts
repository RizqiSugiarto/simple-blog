import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetAllBLogsProps {
    GetAllLoading: boolean;
    GetAllErrMessage: string;
    AllBlog: any;
    getAllBlogs: () => Promise<void>;
}

const useGetAllBlogs = (): UseGetAllBLogsProps => {
    const [GetAllLoading, setGetAllLoading] = useState(false);
    const [GetAllErrMessage, setAllErrMessage] = useState('');
    const [AllBlog, setAllBlog] = useState([]);

    const getAllBlogs = async (): Promise<void> => {
        setGetAllLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/blogs/user`, {
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
            setAllBlog(data);
        } catch (error: any) {
            setAllErrMessage(error.message);
        } finally {
            setGetAllLoading(false);
        }
    };

    return { GetAllLoading, GetAllErrMessage, AllBlog, getAllBlogs };
};

export default useGetAllBlogs;
