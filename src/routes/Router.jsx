import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const Router = () => {
    return (
        <BrowserRouter>
            <PublicRoutes />

            <ProtectedRoutes />
        </BrowserRouter>
    );
};

export default Router;
