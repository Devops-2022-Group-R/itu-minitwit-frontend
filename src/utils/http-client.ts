import axios from "axios";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    headers: {
        "Content-Type": "application/json",
    },
});

const createAuthHeader = (token: string) => {
    return {
        Authorization: `Basic ${token}`,
    };
}

export { httpClient, createAuthHeader };