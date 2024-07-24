import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseGetProfileProps {
    getProfileLoading: boolean;
    getProfileErrMessage: string;
    profile: any;
    getProfile: (userId: string) => Promise<void>;
}

const useGetProfile = (): UseGetProfileProps => {
    const [getProfileLoading, setGetProfileLoading] = useState<boolean>(false);
    const [getProfileErrMessage, setGetProfileErrMessage] =
        useState<string>('');
    const [profile, setProfile] = useState<any>(null);

    const getProfile = async (userId: string): Promise<void> => {
        setGetProfileLoading(true);

        try {
            const response = await fetch(`${BaseUrl}/users/profile/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            const data = await response.json();
            setProfile(data);
        } catch (error: any) {
            setGetProfileErrMessage(error.message);
            console.error('Error fetching data draft');
        } finally {
            setGetProfileLoading(false);
        }
    };
    return { getProfileLoading, getProfileErrMessage, profile, getProfile };
};

export default useGetProfile;
