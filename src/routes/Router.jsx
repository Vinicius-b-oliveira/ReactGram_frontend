import { BrowserRouter } from "react-router-dom";

// Pages
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

// Componetes
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <PublicRoutes />

            <ProtectedRoutes />
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
