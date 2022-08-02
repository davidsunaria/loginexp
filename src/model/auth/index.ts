import { action, thunk, Thunk, Action } from "easy-peasy";
import { StoreModel } from "../";
import { login } from "../../api";
import { setToken } from "../../utils/services";

export interface AuthModel {
  // addTodo: Action<AuthModel, any>;
  login: Thunk<AuthModel, any>;
}

const authModel: AuthModel = {
  login: thunk<StoreModel, AuthModel>(async (actions, payload) => {
    let response = await login(payload);
    console.log("response", response);
    if (response?.status === 200) {
      setToken(response?.data?.access_token);
    } else if (response?.status !== 200) {
      alert("wrong email or password");
    }
  }),
};

export default authModel;
