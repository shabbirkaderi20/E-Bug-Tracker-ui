import * as ActionTypes from '../ActionTypes';

export const Bugs = (state  = { 
    isLoading: true,
    errMess: null,
bugs:[]}, action) => {

switch (action.type) {
    
    case ActionTypes.ADD_BUGS:
        return {...state, isLoading: false, errMess: null, bugs: action.payload};

    case ActionTypes.BUGS_LOADING:
        return {...state, isLoading: true, errMess: null, bugs: []}

    case ActionTypes.BUGS_FAILED:
        return {...state, isLoading: false, errMess: action.payload};

    default:
        return state;
}
};