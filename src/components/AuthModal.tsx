// AuthModal.tsx
import React, { useState } from 'react';
import Modal from './Modal';

interface AuthModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isVisible, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login submitted');
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register submitted');
    };

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <h2 className="text-2xl font-bold mb-4 text-primary">{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
                {!isLogin && (
                    <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input type="text" className="input input-bordered border-gray-300 w-full" required />
                    </div>
                )}
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input type="email" className="input input-bordered border-gray-300 w-full" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input type="password" className="input input-bordered border-gray-300 w-full" required />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <p className="mt-4 text-center">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button className="text-blue-500" onClick={toggleForm}>
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </p>
        </Modal>
    );
};

export default AuthModal;
