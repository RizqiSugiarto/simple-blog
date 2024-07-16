import React from 'react';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
                <div className='flex justify-end'>
                <button className="cursor-pointer" onClick={onClose}>
                    ✕
                </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
