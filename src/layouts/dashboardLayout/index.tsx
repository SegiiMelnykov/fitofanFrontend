import { FC, ReactNode } from "react";
import { Col, Row } from "react-bootstrap";
import { Outlet, useNavigate } from 'react-router-dom';
import NavMenu from "./nav/NavMenu";
import './index.css';
import { useAppSelector } from "hooks/redux";
import { pathConst } from "utils/pathConst";



interface DashboardLayoutProps {
    children?: ReactNode;
}


const DashboardLayout: FC<DashboardLayoutProps> = ({ children}) => {
    const { user} = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    if (!user.isAuth) {
        navigate(pathConst.LOGIN);
    }

    return (
        <div className="container-fluid">  
            <Row>
                <Col sm={3} md={2} xl={1} className="border-right ps-0">
                    <NavMenu/>                
                </Col>
                <Col sm={9} md={10} xl={11} >
                    {children || <Outlet />}
                </Col>
            </Row>

        </div>
    );
};

export default DashboardLayout;