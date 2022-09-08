import { action, thunk, Thunk, Action } from "easy-peasy";
import { StoreModel } from "..";
import {
  addCatagory,
  getCatagory,
  addProduct,
  getProducts,
  getCustomerCategory,
  getSelectedCategory,
  getCustomerFilterProducts,
} from "../../api";
import { setToken, clearToken, isLogin } from "../../utils/services";
import { toast } from "react-toastify";
import store from "../../store";

export interface ProductModel {
  catagory: any;
  filterCategory: any;
  customerCategory: any;
  product: any;
  customerFilterProducts:any;

  // logout: Action<ProductModel, object | any>;
  getCatagory: Thunk<ProductModel, object | any>;
  getSelectedCategory: Thunk<ProductModel, object | any>;
  getCustomerCategory: Thunk<ProductModel, object | any>;
  getProducts: Thunk<ProductModel, object | any>;
  getCustomerFilterProducts: Thunk<ProductModel, object | any>;
  addCatagory: Thunk<ProductModel, object | any>;
  addProduct: Thunk<ProductModel, object | any>;
  setCatagory: Action<ProductModel, object | any>;
  setCustomerCategory: Action<ProductModel, object | any>;
  setProduct: Action<ProductModel, object | any>;
  setFilterCategory: Action<ProductModel, object | any>;
  setCustomerFilterProducts: Action<ProductModel, object | any>;
}

const productModel: ProductModel = {
  catagory: [],
  product: [],
  customerCategory: [],
  filterCategory: [],
  customerFilterProducts:[],
  setCatagory: action((state, payload) => {
    state.catagory = payload;
  }),
  setProduct: action((state, payload) => {
    state.product = payload;
  }),
  setFilterCategory: action((state, payload) => {
    state.filterCategory = payload;
  }),
  setCustomerCategory: action((state, payload) => {
    state.customerCategory = payload;
  }),

  setCustomerFilterProducts: action((state, payload) => {
    state.customerFilterProducts = payload;
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

  addProduct: thunk<StoreModel, ProductModel, any>(
    async (actions: any, payload: any) => {
      let response = await addProduct(payload);
      console.log("response", response);
      if (response?.status === 200) {
        // setToken(response?.data?.access_token);
        //actions.setCatagory(response?.data?.addedData?.catagory)
        toast.success("Product added successfully");
        // await actions.setLogOut(false);
      } else if (response?.status !== 200) {
        toast.error("something went wrong");
        // alert();
      }
    }
  ),

  getCatagory: thunk<StoreModel, ProductModel, any>(
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

  getCustomerCategory: thunk<StoreModel, ProductModel, any>(
    async (actions?: any, payload?: any) => {
      console.log("modal paylaod", payload);
      let response = await getCustomerCategory(payload);
      console.log("response", response?.addedData?.catagory);
      if (response?.status === 200) {
        // setToken(response?.data?.access_token);
        actions.setCustomerCategory(response?.addedData?.catagory);
        actions.setFilterCategory(response?.addedData?.catagory);
        toast.success("catagory loaded");
        // await actions.setLogOut(false);
      } else if (response?.status !== 200) {
        toast.error("something went wrong");
        // alert();
      }
    }
  ),

  getSelectedCategory: thunk<StoreModel, ProductModel, any>(
    async (actions?: any, payload?: any) => {
      console.log("modal paylaod", payload);
      let response = await getSelectedCategory(payload);
      console.log("response", response);
      if (response?.status === 200) {
        // setToken(response?.data?.access_token);
        actions.setCustomerCategory(response?.addedData);
        toast.success("catagory loaded");
        // await actions.setLogOut(false);
      } else if (response?.status !== 200) {
        toast.error("something went wrong");
        // alert();
      }
    }
  ),

  getProducts: thunk<StoreModel, ProductModel, any>(
    async (actions?: any, payload?: any) => {
      console.log("modal paylaod", payload);
      let response = await getProducts(payload);
      console.log("response", response?.addedData?.catagory);
      if (response?.status === 200) {
        // setToken(response?.data?.access_token);
        actions.setProduct(response?.addedData);
        toast.success("Products loaded");
        // await actions.setLogOut(false);
      } else if (response?.status !== 200) {
        toast.error("something went wrong");
        // alert();
      }
    }
  ),
  getCustomerFilterProducts: thunk<StoreModel, ProductModel, any>(
    async (actions?: any, payload?: any) => {
      let response = await getCustomerFilterProducts(payload);
      console.log("response", response?.addedData?.catagory);
      if (response?.status === 200) {
        actions.setCustomerFilterProducts(response?.addedData);
        toast.success("Products loaded");
      } else if (response?.status !== 200) {
        toast.error("something went wrong");
        // alert();
      }
    }
  ),
};

export default productModel;
