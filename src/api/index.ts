import { http } from "../utils/HttpService";

export const login = async (payload: any) => {
  try {
    let response = await http.post("/auth/login", payload);
    return response;
  } catch (error: any) {
    return error?.response?.data;
  }
};
