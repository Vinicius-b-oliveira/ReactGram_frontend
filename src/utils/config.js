export const api = "https://reactgram-api-tvsx.onrender.com/api";

export const requestConfig = (method, data, token = null, image = null) => {
    let config;

    if (image) {
        config = {
            method,
            body: data,
            headers: {},
            credentials: "include",
        };
    } else if (method === "DELETE" || data === null) {
        config = {
            method,
            headers: {},
            credentials: "include",
        };
    } else {
        config = {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        };
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};
