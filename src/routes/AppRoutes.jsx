// Router
import { Route, Routes } from "react-router-dom";

// Auth
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import EditProfile from "../pages/EditProfile";
import Profile from "../pages/Profile";
import Photo from "../pages/Photo";
import Search from "../pages/Search";

export const AppRoutes = ({ auth }) => (
    <Routes>
        <Route
            path="/"
            element={
                <ProtectedRoute auth={auth}>
                    <Home />
                </ProtectedRoute>
            }
        />
        <Route
            path="/profile"
            element={
                <ProtectedRoute auth={auth}>
                    <EditProfile />
                </ProtectedRoute>
            }
        />
        <Route
            path="/users/:id"
            element={
                <ProtectedRoute auth={auth}>
                    <Profile />
                </ProtectedRoute>
            }
        />
        <Route
            path="/search"
            element={
                <ProtectedRoute auth={auth}>
                    <Search />
                </ProtectedRoute>
            }
        />
        <Route
            path="/photos/:id"
            element={
                <ProtectedRoute auth={auth}>
                    <Photo />
                </ProtectedRoute>
            }
        />
        <Route
            path="/login"
            element={
                <PublicRoute auth={auth}>
                    <Login />
                </PublicRoute>
            }
        />
        <Route
            path="/register"
            element={
                <PublicRoute auth={auth}>
                    <Register />
                </PublicRoute>
            }
        />
    </Routes>
);
