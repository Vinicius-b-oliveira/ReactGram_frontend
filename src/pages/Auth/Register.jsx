// SCSS
import "./Auth.scss";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: [],
    });

    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let errors = [];

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!formData.name) {
            errors.push("Insira um nome");
        } else if (formData.name.length < 3) {
            errors.push("O nome precisa ter no mínimo 3 caracteres");
        }

        if (!formData.email) {
            errors.push("Insira um email");
        } else if (!regex.test(formData.email)) {
            errors.push("Insira um email válido");
        }

        if (!formData.password) {
            errors.push("Insira uma senha");
        } else if (formData.password.length < 5) {
            errors.push("A senha precisa ter no mínimo 5 caracteres");
        }

        if (!formData.confirmPassword) {
            errors.push("Confirme a sua senha");
        } else if (formData.password !== formData.confirmPassword) {
            errors.push("As senhas não são iguais");
        }

        setFormData((prev) => ({ ...prev, errors }));
        return errors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormData((prev) => ({
            ...prev,
            errors: [],
        }));

        dispatch(reset());

        const isFormValid = validateForm();

        if (!isFormValid) {
            return;
        }

        if (formData.errors) {
            return;
        }

        const user = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        };

        dispatch(register(user));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div id="register">
            <h2>ReactGram</h2>
            <p className="subtitle">
                Cadastre-se para ver as fotos dos seus amigos.
            </p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
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
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme a senha"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                />

                {!loading && <input type="submit" value="Cadastrar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {error && <Message message={error} type="error" />}
                {formData.errors.length > 0 && (
                    <Message message={formData.errors[0]} type="error" />
                )}
            </form>

            <p>
                Já tem conta? <Link to="/login">Clique aqui</Link>
            </p>
        </div>
    );
};

export default Register;
