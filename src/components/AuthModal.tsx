import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from './Modal';
import useRegister from '@/hooks/useRegister';
import useLogin from '@/hooks/useLogin';
import { RegisterRequest, LoginRequest } from '@/types';
import { useAuthContext } from '@/context/authContext';
import { AuthUser } from '@/context/authContext';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isVisible, onClose }) => {
    const { setAuthUser } = useAuthContext();
    const { RegisterErrMessage, RegisterLoading, register } = useRegister();
    const { LoginErrMessage, LoginLoading, LoginIsSuccess, login } = useLogin();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    // State variables for validation
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setName('');
        setEmail('');
        setPassword('');
        setNameError('');
        setEmailError('');
        setPasswordError('');
    };

    // Validate functions
    const validateName = (name: string) => {
        return name.length >= 3 && name.length <= 10;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        return (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /\d/.test(password) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
            !/\s/.test(password)
        );
    };

    // Handle functions
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setName(newValue);

        if (newValue.trim() === '') {
            setNameError('');
        } else if (!validateName(newValue)) {
            setNameError('Name must be between 3 and 10 characters');
        } else {
            setNameError('');
        }
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setEmail(newValue);

        if (newValue.trim() === '') {
            setEmailError('');
        } else if (!validateEmail(newValue)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setPassword(newValue);

        if (newValue.trim() === '') {
            setPasswordError('');
        } else if (!validatePassword(newValue)) {
            setPasswordError(
                'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
            );
        } else {
            setPasswordError('');
        }
    };

    const isRegisterFormValid = () => {
        return (
            name.trim() !== '' &&
            email.trim() !== '' &&
            password.trim() !== '' &&
            !nameError &&
            !emailError &&
            !passwordError
        );
    };

    const isLoginFormValid = () => {
        return email.trim() !== '' && password.trim() !== '';
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const req: RegisterRequest = {
            name: name,
            email: email,
            password: password,
            role: 'user'
        };

        if (!nameError && !emailError && !passwordError) {
            register(req);
        }
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const req: LoginRequest = {
            email: email,
            password: password
        };

        await login(req);
    };

    useEffect(() => {
        if (LoginIsSuccess) {
            onClose();

            const token = Cookies.get('jwt');

            if (token) {
                const decoded: AuthUser = jwtDecode(token);
                setAuthUser(decoded);
            }
        }
    }, [LoginIsSuccess]);

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <h2 className="text-2xl font-bold mb-4 text-primary">
                {isLogin ? 'Login' : 'Register'}
            </h2>
            <div className="my-5">
                {/* Display error messages */}
                {isLogin && LoginErrMessage && (
                    <p className="text-red-500 mt-2">{LoginErrMessage}</p>
                )}
                {!isLogin && RegisterErrMessage && (
                    <p className="text-red-500 mt-2">{RegisterErrMessage}</p>
                )}
            </div>
            <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
                {!isLogin && (
                    <div className="mb-4">
                        {nameError && (
                            <p className="text-red-500 mt-1 my-2">
                                {nameError}
                            </p>
                        )}
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            className={`input input-bordered focus:outline-none focus:border-purple-500 w-full ${nameError ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                )}
                <div className="mb-4">
                    {emailError && (
                        <p className="text-red-500 mt-1 my-2">{emailError}</p>
                    )}
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        className={`input input-bordered focus:outline-none focus:border-purple-500 w-full ${emailError ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                        value={email}
                        onChange={
                            isLogin
                                ? (e) => setEmail(e.target.value)
                                : handleEmailChange
                        }
                        required
                    />
                </div>
                <div className="mb-4">
                    {passwordError && (
                        <p className="text-red-500 mt-1 my-2">
                            {passwordError}
                        </p>
                    )}
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        className={`input input-bordered focus:outline-none focus:border-purple-500 w-full ${passwordError ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
                        value={password}
                        onChange={
                            isLogin
                                ? (e) => setPassword(e.target.value)
                                : handlePasswordChange
                        }
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full disabled:bg-purple-300"
                    disabled={
                        isLogin
                            ? !isLoginFormValid() || LoginLoading
                            : !isRegisterFormValid() || RegisterLoading
                    }
                >
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <p className="mt-4 text-center">
                {isLogin
                    ? "Don't have an account?"
                    : 'Already have an account?'}{' '}
                <button className="text-purple-500" onClick={toggleForm}>
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </p>
        </Modal>
    );
};

export default AuthModal;
