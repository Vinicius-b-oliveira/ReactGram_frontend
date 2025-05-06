// SCSS
import "./EditProfile.scss";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { profile, updateProfile } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";

const EditProfile = () => {
    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch, "both");

    const { user, message, error, loading } = useSelector(
        (state) => state.user
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [bio, setBio] = useState("");
    const [imagePreview, setImagePreview] = useState("");

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

    const handleFile = (e) => {
        const image = e.target.files[0];

        setImagePreview(image);

        setProfileImage(image);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name,
        };

        if (profileImage) {
            userData.profileImage = profileImage;
        }

        if (bio) {
            userData.bio = bio;
        }

        if (password) {
            userData.password = password;
        }

        const formData = new FormData();

        Object.keys(userData).forEach((key) =>
            formData.append(key, userData[key])
        );

        dispatch(updateProfile(formData));

        resetMessage();
    };

    return (
        <div id="edit_profile">
            <h2>Edite seus dados</h2>
            <p className="subtitle">Atualize o seu perfil como desejar!</p>

            {(user.profileImage || imagePreview) && (
                <img
                    className="profile_image"
                    src={
                        imagePreview
                            ? URL.createObjectURL(imagePreview)
                            : user.profileImage
                    }
                    alt="Profile image"
                />
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    disabled
                    value={email || ""}
                />
                <label>
                    <span>Imagem do perfil: </span>
                    <input type="file" onChange={handleFile} />
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
                        value={password || ""}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                {!loading && <input type="submit" value="Atualizar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {error && <Message message={error} type="error" />}
                {message && <Message message={message} type="success" />}
            </form>
        </div>
    );
};

export default EditProfile;
