import React from 'react';
interface HomepageLayoutProps {
    children: React.ReactNode;
}

const HomepageLayout: React.FC<HomepageLayoutProps> = ({ children }) => {
    return (
        <div className="homepage-layout">
            <main>{children}</main>
        </div>
    );
};

export default HomepageLayout;
