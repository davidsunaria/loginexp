
import axios from "axios";

let axiosOption = {
    baseURL: "http://localhost:8000/"
}

export const http = axios.create(
    axiosOption

)