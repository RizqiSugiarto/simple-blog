import { useState } from 'react';
import { Like } from '@/types';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseCreateLikeProps {
    CreateLikeLoading: boolean;
    CreateLikeErrMessage: string;
    CreateLikes: (likeData: Like) => Promise<void>;
}

const useCreateLike = (): UseCreateLikeProps => {
    const [CreateLikeLoading, setCreateLikeLoading] = useState(false);
    const [CreateLikeErrMessage, setCreateLikeErrMessage] = useState('');
    // const [CreateView, setCreateView] = useState([]);

    const CreateLikes = async (likeData: Like): Promise<void> => {
        setCreateLikeLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/blogs/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(likeData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch blogs');
            }

            // const data = await response.json();
            // setCreateView(data);
        } catch (error) {
            setCreateLikeErrMessage(
                error instanceof Error ? error.message : 'Failed to fetch blogs'
            );
        } finally {
            setCreateLikeLoading(false);
        }
    };

    return { CreateLikeLoading, CreateLikeErrMessage, CreateLikes };
};

export default useCreateLike;
