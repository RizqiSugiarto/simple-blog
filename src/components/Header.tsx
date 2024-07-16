import React, { useState } from 'react';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="flex justify-between items-center px-2">
            <div className="w-[180px]">
                <h1 className="text-3xl text-purpleCustom font-bold">
                    Simple Blog
                </h1>
            </div>
            {/* <ul className="hidden md:flex gap-4 md:gap-14 lg:gap-20">
                <li className="hover:font-bold hover:text-purpleCustom cursor-pointer text-base font-Jost">
                    Home
                </li>
                <li className="hover:font-bold hover:text-purpleCustom cursor-pointer text-base font-Jost">
                    About
                </li>
            </ul> */}
            <button className="min-w-24 bg-purpleCustom min-h-8 rounded-full text-center text-white font-Jost font-bold" onClick={openModal}>
                Login?
            </button>
            <AuthModal isVisible={isModalVisible} onClose={closeModal} />
        </div>
    );
};

export default Header;
