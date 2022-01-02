import UserProvider, { useUser } from "./provider/UserProvider";
import "./styles/Styles.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "./pages/Admin/DashBoard/DashBoard";
import Login from "./pages/Login/Login";
import Payment from "./pages/Admin/Payment/Payment";
import Clients from "./pages/Admin/Clients/Clients";
import Employees from "./pages/Admin/Employees/Employees";
import ClientDashBoard from "./pages/Client/DashBoard/ClientDashBoard";
import UserLogin from "./pages/Login/UserLogin";
import DoctorDashBoard from "./pages/Doctor/DashBoard/DoctorDashBoard";
import DoctorClients from "./pages/Doctor/Clients/DoctorClients";
import DoctorSchedule from "./pages/Doctor/Schedule/DoctorSchedule";
import EditEmployeeSchedule from "./pages/Admin/Employees/Schedule/EditEmployeeSchedule";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/user_login" exact>
                    <UserLogin />
                </Route>
                <UserProvider>
                    <RouterManager />
                </UserProvider>
            </Switch>
        </Router>
    );
};

const RouterManager = () => {
    const { user } = useUser();

    return (
        <>
            {user.role === "ADMIN" && (
                <>
                    <Route path="/dashboard" exact>
                        <DashBoard />
                    </Route>
                    <Route path="/payment" exact>
                        <Payment />
                    </Route>
                    <Route path="/clients" exact>
                        <Clients />
                    </Route>
                    <Route path="/employees" exact>
                        <Employees />
                    </Route>
                    <Route path="/employees/calendar/:employee_id" exact>
                        <EditEmployeeSchedule />
                    </Route>
                </>
            )}
            {user.role === "DOCTOR" && (
                <>
                    <Route path="/dashboard" exact>
                        <DoctorDashBoard />
                    </Route>
                    <Route path="/clients" exact>
                        <DoctorClients />
                    </Route>
                    <Route path="/schedule" exact>
                        <DoctorSchedule />
                    </Route>
                </>
            )}
            {!user.role && (
                <>
                    <Route path="/dashboard" exact>
                        <ClientDashBoard />
                    </Route>
                </>
            )}
        </>
    );
};

export default App;
