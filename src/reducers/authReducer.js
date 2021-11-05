import { types } from "../types/types";
/*
{
    uid: l234879iwh2o9,
    name: 'Emmanuel'
}
*/

export const authReducer = ( state = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            } 
        case types.logout:
            return {};
        default:
            return state;
    }

}