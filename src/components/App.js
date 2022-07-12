import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import { PrivateRoute } from "./PrivateRoute";
import Signup from "./Signup";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Container fluid>
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
        {/* <Signup /> */}
      </div>
    </Container>
  );
}

export default App;
