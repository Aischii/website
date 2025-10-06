import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <div className="container">
                <Sidebar />
                <main className="main-content">{children}</main>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
