import { action, thunk, Thunk, Action } from "easy-peasy";
import { StoreModel } from "../";
import { login } from "../../api";
import { setToken ,clearToken} from "../../utils/services";

export interface AuthModel {
  // addTodo: Action<AuthModel, any>;
  loginValue: boolean;
  login: Thunk<AuthModel, any>;
 //logout: Thunk<AuthModel, any>;
  logout: Action<AuthModel, object | any>;
  setLogin: Action<AuthModel, object | any>;
}

const authModel: AuthModel = {
  loginValue: false,
  setLogin: action((state, payload) => {
    console.log("payload",payload)
    state.loginValue = payload;
  }),
  logout: action((state, payload) => {
    console.log("payload",payload)
    state.loginValue = payload;
    clearToken()
  }),
  login: thunk<StoreModel, AuthModel, any>(
    async (actions: any, payload: any) => {
      let response = await login(payload);
      console.log("response", response);
      if (response?.status === 200) {
        setToken(response?.data?.access_token);
        actions.setLogin(true);
      } else if (response?.status !== 200) {
        alert("wrong email or password");
      }
    }
  ),
  // logout: thunk<StoreModel, AuthModel, any>(
  //   async (actions: any, payload: any) => {
  //     clearToken()
  //     actions.setLogin(false);
  //   }
  // ),
};

export default authModel;
