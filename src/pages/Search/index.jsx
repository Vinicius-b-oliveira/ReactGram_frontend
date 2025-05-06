import "./Search.scss";

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { useQuery } from "../../hooks/useQuery";

// components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";

// redux
import { searchPhotos, like } from "../../slices/photoSlice";
import { Link } from "react-router-dom";

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch, "photo");
    const { photos, loading } = useSelector((state) => state.photo);

    const { user } = useSelector((state) => state.auth);

    const handleLike = (photo) => {
        dispatch(like(photo._id));
        resetMessage();
    };

    useEffect(() => {
        dispatch(searchPhotos(search));
    }, [dispatch, search]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div id="search">
            <h2>Você está buscando por: {search}</h2>

            {photos &&
                photos.map((photo) => (
                    <div key={photo._id}>
                        <PhotoItem photo={photo} />
                        <LikeContainer
                            photo={photo}
                            user={user}
                            handleLike={handleLike}
                        />
                        <Link className="btn" to={`/photos/${photo._id}`}>
                            Ver mais
                        </Link>
                    </div>
                ))}
            {photos && photos.length === 0 && (
                <h2 className="no_photos">Nenhuma foto encontrada...</h2>
            )}
        </div>
    );
};

export default Search;
