import { useState } from 'react';
import { AuthUser } from '@/context/authContext';
import { LoginRequest } from '@/types';
import { useAuthContext } from '@/context/authContext';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseLoginProps {
    LoginLoading: boolean;
    LoginErrMessage: string;
    LoginIsSuccess: boolean;
    login: (loginData: LoginRequest) => Promise<void>;
}

const useLogin = (): UseLoginProps => {
    const [LoginLoading, setLoginLoading] = useState(false);
    const [LoginErrMessage, setLoginErrMessage] = useState<string>('');
    const [LoginIsSuccess, setLoginIsSuccess] = useState<boolean>(false);

    const {setAuthUser} = useAuthContext()

    const login = async (loginData: LoginRequest): Promise<void> => {
        setLoginLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/auth/login`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-web-app': 'web'
                },
                body: JSON.stringify(loginData)
            });

            const responseBody = await response.json();

            if (!response.ok) {
                throw new Error(responseBody.error || 'Failed to login');
            }

            localStorage.setItem('access-token', responseBody.data.token);
            setLoginIsSuccess(true);
            const userContextData: AuthUser = {
                userId: responseBody.data.user.id
            }
            setAuthUser(userContextData);
        } catch (error: any) {
            console.error('Error during login:', error);
            setLoginErrMessage(
                error.message || 'Failed to login. Please try again.'
            );
        } finally {
            setLoginLoading(false);
        }
    };

    return { LoginLoading, LoginErrMessage, LoginIsSuccess, login };
};

export default useLogin;
