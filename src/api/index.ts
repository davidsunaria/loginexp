import { http } from "../utils/HttpService";
import { objectToQuery } from "../utils/services";

export const login = async (payload: any) => {
  try {
    let response = await http.post("/auth/login", payload);
    return response;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const signup = async (payload: any) => {
  try {
    let response = await http.post("/auth/register", payload);
    return response;
  } catch (error: any) {
    return error?.response?.data;
  }
};


export const addCatagory = async (payload: any) => {
  try {
    let response = await http.post("/auth/addcatagory", payload);
    return response;
  } catch (error: any) {
    return error?.response?.data;
  }
};


export const addProduct = async (payload: any) => {
  try {
    let response = await http.post("/auth/addproduct", payload);
    return response;
  } catch (error: any) {
    return error?.response?.data;
  }
};

// export const getCatagory = async () => {
//   try {
//     let response = await http.get("/auth/getcatagory");
//     return response?.data;
//   } catch (error) {
//    // return error?.response?.data;
//   }
// };

export const getCatagory = async (formData: any): Promise<any> => {
 // let queryString="";
  const { url, payload } = formData;
  try {
    const response = await http.get(`${url}?email=${payload?.email}`);
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getSelectedCategory = async (formData: any): Promise<any> => {
  // let queryString="";
   const { url, payload } = formData;
   console.log("api payload",payload?.category)
   try {
     const response = await http.get(`${url}?category=${payload?.category}`);
     return response?.data;
   } catch (error: any) {
     return error?.response?.data;
   }
 };

export const getCustomerCategory = async (formData: any): Promise<any> => {
  // let queryString="";
   const { url, payload } = formData;
   try {
     const response = await http.get(`${url}`);
     return response?.data;
   } catch (error: any) {
     return error?.response?.data;
   }
 };

export const getProducts = async (formData: any): Promise<any> => {
  // let queryString="";
   const { url, payload } = formData;
   console.log("url",url)
   console.log("payload",payload)
   // if(payload){
   //  queryString =  objectToQuery(payload);
   // }
   // console.log("queryString",queryString)
   try {
     const response = await http.get(`${url}?email=${payload?.email}&category=${payload?.category}`);
     return response?.data;
   } catch (error: any) {
     return error?.response?.data;
   }
 };


