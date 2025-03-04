import { api, requestConfig } from "../utils/config";

const register = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(`${api}/users/register`, config);

        const json = await res.json();

        if (json) {
            sessionStorage.setItem("user", JSON.stringify(json));
        }
    } catch (error) {
        console.log(error);
    }
};

const authService = {
    register,
};

export default authService;
