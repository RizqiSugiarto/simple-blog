import { useState } from 'react';
import { RegisterRequest } from '@/types';

const BaseUrl = import.meta.env.VITE_BASE_URL;

interface UseRegisterProps {
    RegisterLoading: boolean;
    RegisterErrMessage: string;

    register: (registerData: RegisterRequest) => Promise<void>;
}

const useRegister = (): UseRegisterProps => {
    const [RegisterLoading, setRegisterLoading] = useState(false);
    const [RegisterErrMessage, setRegisterErrMessage] = useState<string>('');

    const register = async (registerData: RegisterRequest): Promise<void> => {
        setRegisterLoading(true);
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
                setRegisterErrMessage(error.message);
            } else {
                setRegisterErrMessage('Failed to register');
            }
        } finally {
            setRegisterLoading(false);
        }
    };

    return { RegisterLoading, RegisterErrMessage, register };
};

export default useRegister;
