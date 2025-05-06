export const api = "https://reactgram-api-tvsx.onrender.com/api";

export const requestConfig = (method, data, token = null, image = null) => {
    const config = {
        method,
        headers: {
            "Content-Type": image ? undefined : "application/json",
        },
        credentials: "include",
        body: image ? data : JSON.stringify(data),
    };

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Remove headers undefined (especialmente para FormData)
    Object.keys(config.headers).forEach((key) => {
        if (config.headers[key] === undefined) {
            delete config.headers[key];
        }
    });

    return config;
};
