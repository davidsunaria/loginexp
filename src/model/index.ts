import authModel,{AuthModel} from "./auth"

export interface StoreModel{
    authModel:AuthModel
}

const storeModel:StoreModel={
    
    authModel
}

export default storeModel