import "./Navbar.scss";

// Components
import { NavLink, Link } from "react-router-dom";

// Icons
import {
    BsSearch,
    BsHouseDoorFill,
    BsFillPersonFill,
    BsFillCameraFill,
} from "react-icons/bs";

// Redux
import { logout, reset } from "../../slices/authSlice";

// Hooks
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { auth } = useAuth();
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate("/login");
    };

    return (
        <header className="page_header">
            <Link className="brand" to="/">
                ReactGram
            </Link>
            <form className="search_form">
                <BsSearch />
                <input type="text" placeholder="Pesquisar" />
            </form>
            <nav>
                <ul className="nav_links">
                    {auth ? (
                        <>
                            <li>
                                <NavLink to="/">
                                    <BsHouseDoorFill />
                                </NavLink>
                            </li>
                            {user && (
                                <li>
                                    <NavLink to={`/users/${user._id}`}>
                                        <BsFillCameraFill />
                                    </NavLink>
                                </li>
                            )}

                            <li>
                                <NavLink to="/profile">
                                    <BsFillPersonFill />
                                </NavLink>
                            </li>
                            <li>
                                <span onClick={handleLogout}>Sair</span>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login">Entrar</NavLink>
                            </li>

                            <li>
                                <NavLink to="/register">Cadastrar</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
