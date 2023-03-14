import BaseLayout from "layouts/baseLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import Auth from "pages/auth/Auth";
import DashboardLayout from "layouts/dashboardLayout";
import TasksPage from "pages/dashboard/tasks/TasksPage";
import TaskCreatePage from "pages/dashboard/tasks/TaskCreatePage";
import TaskDatailsPage from "pages/dashboard/tasks/TaskDatailsPage";
import Dashboard from "pages/dashboard";
import { pathConst } from "utils/pathConst";


function App() {
  return (
    <div className="App">
      <BaseLayout>
              <Routes>
                  <Route path={pathConst.HOME} element={<Home />} />
                  <Route path={pathConst.REGISTER} element={<Auth />} />
                  <Route path={pathConst.LOGIN} element={<Auth />} />
                  <Route path={pathConst.DASHBOARD} element={<DashboardLayout />} >
                      <Route index element={<Dashboard />} />
                      <Route path={pathConst.TASKS} element={<TasksPage />} />
                      <Route path={pathConst.TASK_CREATE} element={<TaskCreatePage />} />
                      <Route path={pathConst.TASK_EDIT+':id'} element={<TaskDatailsPage />} />
                  </Route>
              </Routes>
      </BaseLayout>
    </div>
  );
}

export default App;
