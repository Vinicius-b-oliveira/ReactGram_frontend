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

const Navbar = () => {
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
                    <li>
                        <NavLink to="/">
                            <BsHouseDoorFill />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/login">Entrar</NavLink>
                    </li>

                    <li>
                        <NavLink to="/register">Cadastrar</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
