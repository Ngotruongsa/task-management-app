import { legacy_createStore as createStore} from "redux";
// import thunk from "redux-thunk";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

export default store;
