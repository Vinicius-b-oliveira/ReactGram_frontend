// SCSS
import "./App.scss";

// Router
import { BrowserRouter } from "react-router-dom";

// Pages
import { AppRoutes } from "./routes/AppRoutes";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Hooks
import { useAuth } from "./hooks/useAuth";

const App = () => {
    const { auth, loading } = useAuth();

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <AppRoutes auth={auth} />
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
