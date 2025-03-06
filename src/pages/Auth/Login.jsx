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

// Validation
import * as Yup from "yup";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        errors: [],
    });

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const schema = Yup.object().shape({
        email: Yup.string()
            .required("Insira um email")
            .email("Insira um email válido"),
        password: Yup.string().required("Insira uma senha"),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormData((prev) => ({
            ...prev,
            errors: [],
        }));

        dispatch(reset());

        try {
            await schema.validate(formData, { abortEarly: false });
        } catch (err) {
            setFormData((prev) => ({ ...prev, errors: err.errors }));
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
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={handleInputChange}
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
