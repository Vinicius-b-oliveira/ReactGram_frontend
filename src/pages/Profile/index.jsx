// SCSS
import "./Profile.scss";

import { uploads } from "../../utils/config";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getUserDetails } from "../../slices/userSlice";
import {
    publishPhoto,
    getUserPhotos,
    resetMessage,
    deletePhoto,
} from "../../slices/photoSlice";

const Profile = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const {
        photos,
        loading: loadingPhoto,
        message: messagePhoto,
        error: errorPhoto,
    } = useSelector((state) => state.photo);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }, [dispatch, id]);

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };

    const handleFile = (e) => {
        const image = e.target.files[0];

        setImage(image);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image,
        };

        const formData = new FormData();

        Object.keys(photoData).forEach((key) =>
            formData.append(key, photoData[key])
        );

        dispatch(publishPhoto(formData));

        setTitle("");
        resetComponentMessage();
    };

    const handleDelete = (id) => {
        dispatch(deletePhoto(id));
        resetComponentMessage();
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div id="profile">
            <div className="profile_header">
                {user.profileImage && (
                    <img
                        src={`${uploads}/users/${user.profileImage}`}
                        alt="Imagem de perfil"
                    />
                )}
                <div className="profile_description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            {id === userAuth._id && (
                <>
                    <div className="new_photo" ref={newPhotoForm}>
                        <h3>Compartilhe algum momento seu:</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <span>Título para a foto: </span>
                                <input
                                    type="text"
                                    placeholder="Insira um título"
                                    value={title || ""}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" onChange={handleFile} />
                            </label>
                            {!loadingPhoto && (
                                <input type="submit" value="Postar" />
                            )}
                            {loadingPhoto && (
                                <input
                                    type="submit"
                                    value="Aguarde..."
                                    disabled
                                />
                            )}

                            {errorPhoto && (
                                <Message message={errorPhoto} type="error" />
                            )}
                            {messagePhoto && (
                                <Message
                                    message={messagePhoto}
                                    type="success"
                                />
                            )}
                        </form>
                    </div>
                </>
            )}
            <div className="user_photos">
                <h2>Fotos publicadas:</h2>
                <div className="photos_container">
                    {photos &&
                        photos.map((photo) => (
                            <div className="photo" key={photo._id}>
                                {photo.image && (
                                    <img
                                        src={`${uploads}/photos/${photo.image}`}
                                        alt={photo.title}
                                    />
                                )}
                                {id === userAuth._id ? (
                                    <div className="actions">
                                        <Link to={`/photos/${photo._id}`}>
                                            <BsFillEyeFill />
                                        </Link>
                                        <BsPencilFill />
                                        <BsXLg
                                            onClick={() =>
                                                handleDelete(photo._id)
                                            }
                                        />
                                    </div>
                                ) : (
                                    <Link
                                        className="btn"
                                        to={`/photos/${photo._id}`}
                                    >
                                        Ver
                                    </Link>
                                )}
                            </div>
                        ))}
                    {photos.length === 0 && (
                        <p>Ainda não há fotos publicadas</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
