import authModel,{AuthModel} from "./auth"
import productModel,{ProductModel} from "./product"
import cartModel,{CartModel} from "./cart"

export interface StoreModel{
    authModel:AuthModel,
    productModel:ProductModel,
    cartModel:CartModel
}

const storeModel:StoreModel={
    
    authModel,
    productModel,
    cartModel

}

export default storeModel