import { action, thunk, Thunk, Action } from "easy-peasy";
import { StoreModel } from "../";
import { login, signup } from "../../api";
import { setToken, clearToken, isLogin } from "../../utils/services";
import { toast } from "react-toastify";
import store from "../../store";

export interface AuthModel {
  // addTodo: Action<AuthModel, any>;
  loginValue: boolean;
  email:string;
  isLoggedOut: boolean;
  accountType:string;
  name: string;
  isSignUp: boolean;
  login: Thunk<AuthModel, any>;
  logout: Thunk<AuthModel, any>;
  signup: Thunk<AuthModel, any>;
  

  // logout: Action<AuthModel, object | any>;
  setLogin: Action<AuthModel, object | any>;
  setLogOut: Action<AuthModel, object | any>;
  setSignUp: Action<AuthModel, object | any>;
  setAccountType: Action<AuthModel, object | any>;
  setEmail:Action<AuthModel, any>;
}

const authModel: AuthModel = {
  loginValue: isLogin() ? true : false,
  isLoggedOut: !isLogin() ? true : false,
  email:"",
  accountType:"",
  isSignUp: false,
  name: "raman",
  setLogin: action((state, payload) => {
    state.loginValue = payload;
  }),
  setEmail: action((state, payload) => {
    state.email = payload;
  }),
  setLogOut: action((state, payload) => {
    console.log("payload", payload);
    state.isLoggedOut = payload;
  }),
  setSignUp: action((state, payload) => {
    console.log("payload", payload);
    state.isSignUp = payload;
  }),
  setAccountType: action((state, payload) => {
    console.log("payload", payload);
    state.accountType = payload;
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
        actions.setAccountType(payload?.account_type)
        setToken(response?.data?.access_token);
        actions.setEmail(response?.data?.email)
        actions.setLogin(true);
        toast.success("login successfully");
        await actions.setLogOut(false);
      } else if (response?.status !== 200) {
        toast.error("wrong email or password");
        // alert();
      }
    }
  ),

  signup: thunk<StoreModel, AuthModel, any>(
    async (actions: any, payload: any) => {
      let response = await signup(payload);
      console.log("response", response);
      if (response?.status === 200) {
        // setToken(response?.data?.access_token);
         actions.setSignUp(true);
        toast.success("signup successfully");
        // await actions.setLogOut(false);
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
      actions.setAccountType("")
      toast.success("logout successfully");
      setTimeout(async () => {
        await store.persist.clear();
      }, 100);
    }
  ),
};

export default authModel;
