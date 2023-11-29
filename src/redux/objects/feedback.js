import * as ActionTypes from './ActionTypes';

export const feedbacks = (state = {
        errMess: null,
        feedback: []
    }, action) => {
    switch (action.type) {
        
        case ActionTypes.ADD_FEEDBACK:
            var newFeedback = action.payload;
            console.log("Feedback: ", newFeedback);
            alert(JSON.stringify(newFeedback));
            return {...state, comments: state.feedback.concat(newFeedback)};

        default:
          return state;
      }
};