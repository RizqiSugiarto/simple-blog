import { useState } from 'react';
import { Like } from '@/types';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseCheckLikeProps {
    CheckLikeLoading: boolean;
    CheckLikeErrMessage: string;
    checkLikeStatus: (likeData: Like) => Promise<boolean>;
}

const useCheckLike = (): UseCheckLikeProps => {
    const [CheckLikeLoading, setCheckLikeLoading] = useState(false);
    const [CheckLikeErrMessage, setCheckLikeErrMessage] = useState('');

    const checkLikeStatus = async (likeData: Like): Promise<boolean> => {
        setCheckLikeLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/like/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(likeData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || 'Failed to fetch like status'
                );
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            setCheckLikeErrMessage(error.message);
            return false;
        } finally {
            setCheckLikeLoading(false);
        }
    };

    return { CheckLikeLoading, CheckLikeErrMessage, checkLikeStatus };
};

export default useCheckLike;
