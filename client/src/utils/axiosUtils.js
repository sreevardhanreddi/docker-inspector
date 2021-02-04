import axios from "axios";
import { verifyJwtToken } from "./jwtUtils";

let baseUrl = "";

if (process.env.REACT_APP_STAGE === "dev") {
    let host = "localhost";
    let port = "80";
    baseUrl = `http://${host}:${port}/api`;
} else {
    // let host = "localhost";
    // let port = "85";
    // baseUrl = `http://${host}:${port}/api`;
    baseUrl = `/api`;
}

export const commonAxios = axios.create({
    baseURL: baseUrl,
    headers: { "Content-Type": "application/json" },
});

export const authAxios = axios.create({
    baseURL: baseUrl,
    headers: { "Content-Type": "application/json" },
});

export const setAuthHeaders = (token) => {
    authAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

authAxios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        "access_token"
    )}`;
    return config;
});

authAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        if (
            err.response.status === 401 &&
            err.response.data.msg === "Token has expired"
        ) {
            // if refresh token is expired then logout
            if (verifyJwtToken(localStorage.getItem("refresh_token"))) {
                commonAxios
                    .get("token-refresh", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
                        },
                    })
                    .then((res) => {
                        const accessToken = res.data.access_token;
                        localStorage.setItem("access_token", accessToken);
                    })
                    .catch((e) => {
                        console.log("token refresh error", e);
                        localStorage.clear();
                        window.location.href = "/";
                    });
            } else {
                localStorage.clear();
                window.location.href = "/";
            }
        }
        return Promise.reject(err);
    }
);