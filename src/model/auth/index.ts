import { action, thunk, Thunk, Action } from "easy-peasy";
import { StoreModel } from "../";
import { login } from "../../api";
import { setToken, clearToken } from "../../utils/services";
import { toast } from "react-toastify";

export interface AuthModel {
  // addTodo: Action<AuthModel, any>;
  loginValue: boolean;
  isLoggedOut: boolean;
  name: string;
  login: Thunk<AuthModel, any>;
  logout: Thunk<AuthModel, any>;
  // logout: Action<AuthModel, object | any>;
  setLogin: Action<AuthModel, object | any>;
  setLogOut: Action<AuthModel, object | any>;
}

const authModel: AuthModel = {
  loginValue: false,
  isLoggedOut: false,
  name: "raman",
  setLogin: action((state, payload) => {
    state.loginValue = payload;
  }),
  setLogOut: action((state, payload) => {
    console.log("payload", payload);
    state.isLoggedOut = payload;
  }),
  // logout: action((state, payload) => {
  //   console.log("payload",payload)
  //   state.isLoggedOut = true;
  //   clearToken()
  // }),
  login: thunk<StoreModel, AuthModel, any>(
    async (actions: any, payload: any) => {
      let response = await login(payload);
      console.log("response", response);
      if (response?.status === 200) {
        setToken(response?.data?.access_token);
        actions.setLogin(true);
        await actions.setLogOut(false);
      } else if (response?.status !== 200) {
        toast.error("wrong email or password");
        // alert();
      }
    }
  ),
  logout: thunk<StoreModel, AuthModel, any>(
    async (actions: any, payload: any) => {
      clearToken();
      await actions.setLogOut(payload);
      await actions.setLogin(false);
    }
  ),
};

export default authModel;
