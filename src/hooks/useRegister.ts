import { useState } from 'react';
import { RegisterRequest } from '@/types';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseRegisterProps {
    loading: boolean;
    errMessage: string;

    register: (registerData: RegisterRequest) => Promise<void>;
}

const useRegister = (): UseRegisterProps => {
    const [loading, setLoading] = useState(false);
    const [errMessage, seterrMessage] = useState<string>('');

    const register = async (registerData: RegisterRequest): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to register');
            }
            return response.json();
        } catch (error: any) {
            if (error instanceof Error) {
                seterrMessage(error.message);
            } else {
                seterrMessage('Failed to register');
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, errMessage, register };
};

export default useRegister;
