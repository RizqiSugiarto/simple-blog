import { useState } from 'react';

type UpdateProfile = {
    userId: string;
    name: string;
    email: string;
    imageProfile?: File;
};

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseUpdateProfileProps {
    updateProfileLoading: boolean;
    updateProfileErrMessage: string;
    updateProfile: (updateProfileData: UpdateProfile) => Promise<void>;
}

const useUpdateProfile = (): UseUpdateProfileProps => {
    const [updateProfileLoading, setUpdateProfileLoading] =
        useState<boolean>(false);
    const [updateProfileErrMessage, setUpdateProfileErrMessage] =
        useState<string>('');

    const updateProfile = async (updateProfileData: UpdateProfile) => {
        setUpdateProfileLoading(true);
        try {
            const formData = new FormData();
            if (updateProfileData.name) {
                formData.append('name', updateProfileData.name);
            }
            if (updateProfileData.email) {
                formData.append('email', updateProfileData.email);
            }
            if (updateProfileData.imageProfile) {
                formData.append('imageProfile', updateProfileData.imageProfile);
            }

            const response = await fetch(
                `${BaseUrl}/users/profile/${updateProfileData.userId}`,
                {
                    method: 'PUT',
                    body: formData
                }
            );
            if (!response.ok) {
                throw new Error('Error when update profile');
            }

            return response.json();
        } catch (error: any) {
            setUpdateProfileErrMessage(error.message);
        } finally {
            setUpdateProfileLoading(false);
        }
    };
    return { updateProfileLoading, updateProfileErrMessage, updateProfile };
};

export default useUpdateProfile;
