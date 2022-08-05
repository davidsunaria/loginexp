
import axios from "axios";

let axiosOption = {
    baseURL: "http://localhost:8000/"
}

export const http = axios.create(
    axiosOption

)

http.interceptors.request.use(function (request) {
    let token = localStorage.getItem("token");
    if (token) {
        let headers = {
            Authorization: `Bearer ${token}`,
        };

        request.headers = headers;
    }
    return request;
});