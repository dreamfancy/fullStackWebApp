import { FETCH_USER } from "../actions/types";

const authReducer = (state = null, action) => {// null is the third state here: still making request
    //console.log(action);
    switch (action.type) {     
        case FETCH_USER: 
            return action.payload.data || false; //If it is empty string "", return false here 
        default: 
            return state;
     }
 }

 export default authReducer;