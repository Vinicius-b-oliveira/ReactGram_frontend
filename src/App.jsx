// SCSS
import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

// Componetes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/*" element={<PublicRoutes />} />

                    <Route path="/protected/*" element={<ProtectedRoutes />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
