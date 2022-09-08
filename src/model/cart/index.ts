import { action, thunk, Thunk, Action } from "easy-peasy";
import { StoreModel } from "..";
import {
  addCatagory,
  getCatagory,
} from "../../api";
import { setToken, clearToken, isLogin } from "../../utils/services";
import { toast } from "react-toastify";
import store from "../../store";

export interface CartModel {
  cart: any;
  

  // logout: Action<ProductModel, object | any>;
  getCart: Thunk<CartModel, object | any>;
  addCart: Thunk<CartModel, object | any>;
  setCart: Action<CartModel, object | any>;
  
}

const cartModel: CartModel = {
  cart: [],
  
  setCart: action((state, payload) => {
    state.cart = payload;
  }),
  

  addCart: thunk<StoreModel, CartModel, any>(
    async (actions: any, payload: any , { getStoreActions, getState}:any) => {
      actions.setCart([
        ...getState()?.cart,
        payload,
      ]);
      // console.log("payload",payload)
       console.log("getState",getState().cart)
    
    }
  ),



  getCart: thunk<StoreModel, CartModel, any>(
    async (actions?: any, payload?: any) => {
      console.log("modal paylaod", payload);
      let response = await getCatagory(payload);
      console.log("response", response?.addedData?.catagory);
      if (response?.status === 200) {
        // setToken(response?.data?.access_token);
        actions.setCatagory(response?.addedData);
        toast.success("catagory loaded");
        // await actions.setLogOut(false);
      } else if (response?.status !== 200) {
        toast.error("something went wrong");
        // alert();
      }
    }
  ),

};

export default cartModel;
