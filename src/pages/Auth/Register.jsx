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

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormData((prev) => ({
            ...prev,
            errors: [],
        }));

        dispatch(reset());

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!formData.name) {
            setFormData((prev) => ({
                ...prev,
                errors: [...prev.errors, "Insira um nome"],
            }));
            return;
        }

        if (formData.name.length < 3) {
            setFormData((prev) => ({
                ...prev,
                errors: [
                    ...prev.errors,
                    "O nome precisa ter no minimo 3 caracteres",
                ],
            }));
            return;
        }

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

        if (formData.password.length < 5) {
            setFormData((prev) => ({
                ...prev,
                errors: [
                    ...prev.errors,
                    "A senha precisa ter no mínimo 5 caracteres",
                ],
            }));
            return;
        }

        if (!formData.confirmPassword) {
            setFormData((prev) => ({
                ...prev,
                errors: [...prev.errors, "Confirme a sua senha "],
            }));
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setFormData((prev) => ({
                ...prev,
                errors: [...prev.errors, "As senhas não são iguais"],
            }));
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
                    placeholder="Nome"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />
                <input
                    type="email"
                    placeholder="Email"
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
                <input
                    type="password"
                    placeholder="Confirme a senha"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                        }))
                    }
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
