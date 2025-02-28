import { Routes, Route } from "react-router-dom";

const ProtectedRoutes = () => {
    return (
        <Routes>
            <Route path="/protected" element={<h1>Protected</h1>} />
        </Routes>
    );
};

export default ProtectedRoutes;
