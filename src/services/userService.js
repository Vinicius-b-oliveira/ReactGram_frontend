import { api, requestConfig } from "../utils/config";

const profile = async (data, token) => {
    const config = requestConfig("GET", data, token);

    try {
        const res = await fetch(`${api}/users/profile`, config);

        const json = await res.json();

        return json;
    } catch (error) {
        console.log(error);
    }
};

const userService = {
    profile,
};

export default userService;
