import authModel,{AuthModel} from "./auth"
import productModel,{ProductModel} from "./product"

export interface StoreModel{
    authModel:AuthModel,
    productModel:ProductModel
}

const storeModel:StoreModel={
    
    authModel,
    productModel
}

export default storeModel