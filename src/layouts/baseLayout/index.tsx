import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { Container } from "react-bootstrap";

interface BaseLayoutProps {
    children?: ReactNode;
}


const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
    return (
        <>
            <Header/>
            {children || <Outlet />}
        </>
    )
}

export default BaseLayout;