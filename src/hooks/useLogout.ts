import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseLogoutProps {
    LogoutLoading: boolean;
    LogoutErrMessage: string;
    logout: () => Promise<void>;
}

const useLogout = (): UseLogoutProps => {
    const [LogoutLoading, setLogoutLoading] = useState(false);
    const [LogoutErrMessage, setLogoutErrMessage] = useState<string>('');

    const logout = async (): Promise<void> => {
        setLogoutLoading(true);
        setLogoutErrMessage('');

        try {
            const response = await fetch(`${BaseUrl}/auth/logout`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('logout Failed');
            }
            return response.json();
        } catch (error: any) {
            setLogoutErrMessage(error.message);
            console.error('logout Failed');
        } finally {
            setLogoutLoading(false);
        }
    };

    return { LogoutLoading, LogoutErrMessage, logout };
};

export default useLogout;
