import { pathConst } from "../../utils/pathConst";
import { Navigate } from "react-router-dom";

const Dashboard = ()=> {
    return <Navigate replace to={pathConst.TASKS} />;

    return (
        <div>
            Dashboard page
        </div>
    );
};

export default Dashboard;