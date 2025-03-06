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

// Validation
import * as Yup from "yup";

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

    const schema = Yup.object().shape({
        name: Yup.string()
            .required("Insira um nome")
            .min(3, "O nome precisa ter no mínimo 3 caracteres"),
        email: Yup.string()
            .required("Insira um email")
            .email("Insira um email válido"),
        password: Yup.string()
            .required("Insira uma senha")
            .min(5, "A senha precisa ter no mínimo 5 caracteres"),
        confirmPassword: Yup.string()
            .required("Confirme a sua senha")
            .oneOf([Yup.ref("password"), null], "As senhas não são iguais"),
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
