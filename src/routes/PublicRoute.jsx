import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, auth }) => {
    return !auth ? children : <Navigate to="/" />;
};

export default PublicRoute;
