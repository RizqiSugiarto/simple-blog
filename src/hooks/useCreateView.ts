import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseCreateViewProps {
    CreateViewLoading: boolean;
    CreateViewErrMessage: string;
    CreateViews: (blogId: string) => Promise<void>;
}

const useCreateView = (): UseCreateViewProps => {
    const [CreateViewLoading, setCreateViewLoading] = useState(false);
    const [CreateViewErrMessage, setCreateViewErrMessage] = useState('');
    // const [CreateView, setCreateView] = useState([]);

    const CreateViews = async (blogId: string): Promise<void> => {
        setCreateViewLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/view/${blogId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch blogs');
            }

            // const data = await response.json();
            // setCreateView(data);
        } catch (error) {
            setCreateViewErrMessage(
                error instanceof Error ? error.message : 'Failed to fetch blogs'
            );
        } finally {
            setCreateViewLoading(false);
        }
    };

    return { CreateViewLoading, CreateViewErrMessage, CreateViews };
};

export default useCreateView;
