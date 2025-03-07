import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, auth }) => {
    return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
