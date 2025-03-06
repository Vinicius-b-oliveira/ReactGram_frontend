// SCSS
import "./Auth.scss";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        errors: [],
    });

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormData((prev) => ({
            ...prev,
            errors: [],
        }));

        dispatch(reset());

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!formData.email) {
            setFormData((prev) => ({
                ...prev,
                errors: [...prev.errors, "Insira um email "],
            }));
            return;
        }

        if (!regex.test(formData.email)) {
            setFormData((prev) => ({
                ...prev,
                errors: [...prev.errors, "Insira um email válido"],
            }));
            return;
        }

        if (!formData.password) {
            setFormData((prev) => ({
                ...prev,
                errors: [...prev.errors, "Insira uma senha "],
            }));
            return;
        }

        const user = {
            email: formData.email,
            password: formData.password,
        };

        dispatch(login(user));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div id="login">
            <h2>ReactGram</h2>

            <p className="subtitle">Faça o login para ver o que há de novo.</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }))
                    }
                />

                {!loading && <input type="submit" value="Entrar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {error && <Message message={error} type="error" />}
                {formData.errors.length > 0 && (
                    <Message message={formData.errors[0]} type="error" />
                )}
            </form>
            <p>
                Não tem uma conta? <Link to="/register">Clique aqui</Link>
            </p>
        </div>
    );
};

export default Login;
