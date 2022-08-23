export const setToken = (payload: any) => {
  localStorage.setItem("token", payload);
};

export const getToken = () => {
  return localStorage.getItem("token");
};
export const clearToken = () => {
  localStorage.removeItem("token");
};

export const isLogin = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

export const objectToQuery = (obj: any) => {
  return (obj) ? Object.entries(obj).map(([k, v]: any) => `${k}=${encodeURIComponent(v)}`).join("&") : '';
}
