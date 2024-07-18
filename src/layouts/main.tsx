import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';

interface MainLyoutProps {
    children: ReactNode
}

const MainLayout = ({ children }: MainLyoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow p-[20px]">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
