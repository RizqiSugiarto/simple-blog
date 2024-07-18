import { useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { LoginRequest } from '@/types';

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

            const tokenVal = Cookies.get('jwt');
            // const Token: AuthUser = {
            //     token: tokenVal
            // };
            const userData = jwtDecode(tokenVal!);

            localStorage.setItem('user-data', JSON.stringify(userData));
            setLoginIsSuccess(true);
            console.log('UDAH SELESAI');
            // setAuthUser(Token);
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
