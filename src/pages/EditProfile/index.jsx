// SCSS
import "./EditProfile.scss";

import { uploads } from "../../utils/config";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";

const EditProfile = () => {
    const dispatch = useDispatch();
    const { user, message, error, loading } = useSelector(
        (state) => state.user
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [bio, setBio] = useState("");
    const [previerImage, setPrevierImage] = useState("");

    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div id="edit_profile">
            <h2>Edite seus dados</h2>
            <p className="subtitle">
                Adicione uma imagem de perfil e conte mais sobre você...
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    disabled
                    value={email}
                />
                <label>
                    <span>Imagem do perfil: </span>
                    <input type="file" />
                </label>
                <label>
                    <span>Bio: </span>
                    <input
                        type="text"
                        placeholder="Descrição do perfil"
                        value={bio || ""}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </label>
                <label>
                    <span>Quer alterar sua senha?</span>
                    <input
                        type="password"
                        placeholder="Digite sua nova senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <input type="submit" value="Atualizar" />
            </form>
        </div>
    );
};

export default EditProfile;
