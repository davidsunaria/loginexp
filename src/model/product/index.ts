import { action, thunk, Thunk, Action } from "easy-peasy";
import { StoreModel } from "..";
import { addCatagory, getCatagory } from "../../api";
import { setToken, clearToken, isLogin } from "../../utils/services";
import { toast } from "react-toastify";
import store from "../../store";

export interface ProductModel {
  catagory: any;

  // logout: Action<ProductModel, object | any>;
  getCatagory: Thunk<ProductModel, object | any>;
  addCatagory: Thunk<ProductModel, object | any>;
  setCatagory: Action<ProductModel, object | any>;
}

const productModel: ProductModel = {
  catagory: [],
  setCatagory: action((state, payload) => {
    state.catagory = payload;
  }),

 
  addCatagory: thunk<StoreModel, ProductModel, any>(
    async (actions: any, payload: any) => {
      let response = await addCatagory(payload);
      console.log("response", response);
      if (response?.status === 200) {
        // setToken(response?.data?.access_token);
        //actions.setCatagory(response?.data?.addedData?.catagory)
        toast.success("Product catagory added successfully");
        // await actions.setLogOut(false);
      } else if (response?.status !== 200) {
        toast.error("something went wrong");
        // alert();
      }
    }
  ),

  getCatagory: thunk<StoreModel, ProductModel, any>(
    async (actions?: any, payload?: any) => {
      console.log("modal paylaod",payload)
      let response = await getCatagory(payload);
      console.log("response", response?.addedData?.catagory);
      if (response?.status === 200) {
        // setToken(response?.data?.access_token);
        actions.setCatagory(response?.addedData)
        toast.success("catagory loaded");
        // await actions.setLogOut(false);
      } else if (response?.status !== 200) {
        toast.error("something went wrong");
        // alert();
      }
    }
  ),
};

export default productModel;
