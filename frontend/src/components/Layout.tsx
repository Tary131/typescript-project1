import  { FC, ReactNode } from 'react';
import Header from "./header/Header.tsx";

type LayoutProps =  {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header/>
            {children}
        </div>
    );
}

export default Layout;
