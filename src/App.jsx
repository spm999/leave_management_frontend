import Admin_dashboard from "./components/Admin/Admin_dashboard"
import Admin_login from "./components/Admin/Admin_login"
import Admin_signup from "./components/Admin/Admin_signup"
import Admin_approve from "./components/Admin/Admin_approve";
import Employee_signup from "./components/Employee/Employee_signup";
import Employee_login from "./components/Employee/Employee_login";
import Employee_dashboard from "./components/Employee/Employee_dashboard";
import Employee_leave from "./components/Employee/Employee_leave";

import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/admin/signup" element={<Admin_signup/>} />
        <Route path="/admin/login" element={<Admin_login />} />
        <Route path="/admin/:admid/dashboard" element={<Admin_dashboard />} />
        <Route path="/admin/:admid/approveLeave/:leaveRequestId" element={<Admin_approve />} />

        <Route path="/employee/signup" element={<Employee_signup />} />
        <Route path="/employee/login" element={<Employee_login />} />
        <Route path="/employee/:empid/dashboard" element={<Employee_dashboard />} />
        <Route path="/employee/:empid/leaverequest" element={<Employee_leave />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  )
}

export default App