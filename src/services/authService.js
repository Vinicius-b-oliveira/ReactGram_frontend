import { api, requestConfig } from "../utils/config";

const register = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(`${api}/users/register`, config);

        const json = await res.json();

        if (json._id) {
            sessionStorage.setItem("user", JSON.stringify(json));
        }

        return json;
    } catch (error) {
        console.log(error);
    }
};

const logout = () => {
    sessionStorage.removeItem("user");
};

const login = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(`${api}/users/login`, config);

        const json = await res.json();

        if (json._id) {
            sessionStorage.setItem("user", JSON.stringify(json));
        }

        return json;
    } catch (error) {
        console.log(error);
    }
};

const authService = {
    register,
    logout,
    login,
};

export default authService;
