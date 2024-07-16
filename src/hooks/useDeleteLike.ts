import { useState } from 'react';
import { Like } from '@/types';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseDeleteLikeProps {
    DeleteLikeLoading: boolean;
    DeleteLikeErrMessage: string;
    DeleteLikes: (likeData: Like) => Promise<void>;
}

const useDeleteLike = (): UseDeleteLikeProps => {
    const [DeleteLikeLoading, setDeleteLikeLoading] = useState(false);
    const [DeleteLikeErrMessage, setDeleteLikeErrMessage] = useState('');

    const DeleteLikes = async (likeData: Like): Promise<void> => {
        setDeleteLikeLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/like/remove`, {
                method: 'DELETE',
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
            // setDeleteView(data);
        } catch (error) {
            setDeleteLikeErrMessage(
                error instanceof Error ? error.message : 'Failed to fetch blogs'
            );
        } finally {
            setDeleteLikeLoading(false);
        }
    };

    return { DeleteLikeLoading, DeleteLikeErrMessage, DeleteLikes };
};

export default useDeleteLike;
