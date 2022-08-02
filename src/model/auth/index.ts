import { action, thunk, Thunk, Action } from "easy-peasy";
import { StoreModel } from "../";
import { login } from "../../api";
import { setToken } from "../../utils/services";

export interface AuthModel {
  // addTodo: Action<AuthModel, any>;
  loginValue: boolean;
  login: Thunk<AuthModel, any>;
  setLogin: Action<AuthModel, object | any>;
}

const authModel: AuthModel = {
  loginValue: false,
  setLogin: action((state, payload) => {
    state.loginValue = payload;
  }),
  login: thunk<StoreModel, AuthModel,any>(async (actions:any, payload:any) => {
    let response = await login(payload);
    console.log("response", response);
    if (response?.status === 200) {
      setToken(response?.data?.access_token);
      actions.setLogin(true)
    } else if (response?.status !== 200) {
      alert("wrong email or password");
    }
  }),
};

export default authModel;
