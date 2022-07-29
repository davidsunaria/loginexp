import { action, thunk,Thunk ,Action} from 'easy-peasy';



  

interface AuthModel {
    name: string;
    // addTodo: Action<AuthModel, any>;
    // saveTodo: Thunk<AuthModel, any>;
  }

const authModel:AuthModel = {
    name: "raman",
 
};

export default authModel