export const setToken = (payload: any) => {
  localStorage.setItem("token", payload);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isLogin = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};
