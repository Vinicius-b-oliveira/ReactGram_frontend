import { api, requestConfig } from "../utils/config";

const publishPhoto = async (data, token) => {
    const config = requestConfig("POST", data, token, true);

    try {
        const res = await fetch(`${api}/photos`, config);

        const json = await res.json();

        return json;
    } catch (error) {
        console.log(error);
    }
};

const getUserPhotos = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(`${api}/photos/user/${id}`, config);

        const json = await res.json();

        return json;
    } catch (error) {
        console.log(error);
    }
};

const deletePhoto = async (id, token) => {
    const config = requestConfig("DELETE", null, token);

    try {
        const res = await fetch(`${api}/photos/${id}`, config);

        const json = await res.json();

        return json;
    } catch (error) {
        console.log(error);
    }
};

const updatePhoto = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(`${api}/photos/${id}`);

        const json = await res.json();

        return json;
    } catch (error) {
        console.log(error);
    }
};

const photoService = { publishPhoto, getUserPhotos, deletePhoto, updatePhoto };

export default photoService;
