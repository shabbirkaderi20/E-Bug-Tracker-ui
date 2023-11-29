import * as ActionTypes from './ActionTypes';
import { userBaseUrl, projectBaseUrl, bugBaseUrl, commentBaseUrl } from '../shared/baseUrl';

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(userBaseUrl + '/all')
    .then(response=> {
        if(response.ok) {
            return response;
        } else {
            var error= new Error('Error'+ response.status+ ': '+ response.statusText);
            error.response= response;
            throw error;
        }
    },
    error => {
        var errMess= new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error=> dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errMess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const fetchProjects = () => (dispatch) => {
    
    dispatch(projectsLoading());

    return fetch(projectBaseUrl + '/')
    .then(response=> {
        if(response.ok) {
            return response;
        } else {
            var error= new Error('Error'+ response.status+ ': '+ response.statusText);
            error.response= response;
            throw error;
        }
    },
    error => {
        var errMess= new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(projects => dispatch(addProjects(projects)))
    .catch(error=> dispatch(projectsFailed(error.message)));
}

export const projectsLoading = () => ({
    type: ActionTypes.PROJECTS_LOADING
});

export const projectsFailed = (errMess) => ({
    type: ActionTypes.PROJECTS_FAILED,
    payload: errMess
});

export const addProjects = (projects) => ({
    type: ActionTypes.ADD_PROJECTS,
    payload: projects
});

export const fetchBugs = () => (dispatch) => {
    
    dispatch(bugsLoading());

    return fetch(bugBaseUrl + '/')
    .then(response=> {
        if(response.ok) {
            return response;
        } else {
            var error= new Error('Error'+ response.status+ ': '+ response.statusText);
            error.response= response;
            throw error;
        }
    },
    error => {
        var errMess= new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(bugs => dispatch(addBugs(bugs)))
    .catch(error=> dispatch(bugsFailed(error.message)));
}

export const bugsLoading = () => ({
    type: ActionTypes.BUGS_LOADING
});

export const bugsFailed = (errMess) => ({
    type: ActionTypes.BUGS_FAILED,
    payload: errMess
});

export const addBugs = (bugs) => ({
    type: ActionTypes.ADD_BUGS,
    payload: bugs
});

export const fetchComments = () => (dispatch) => {    
    return fetch(commentBaseUrl + '/')
    .then(response=> {
        if(response.ok) {
            return response;
        } else {
            var error= new Error('Error'+ response.status+ ': '+ response.statusText);
            error.response= response;
            throw error;
        }
    },
    error => {
        var errMess= new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error=> dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postComment = (postId, bugId, comment, accessToken) => (dispatch)=> {
        
    const newComment= {
        postId: postId,
        bugId: bugId,
        comment: comment,
        accessToken: accessToken
    }
    newComment.date = new Date().toISOString();

    return fetch(commentBaseUrl+ '/addComment', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response=> {
        if(response.ok) {
            return response;
        } else {
            var error= new Error('Error'+ response.status+ ': '+ response.statusText);
            error.response= response;
            throw error;
        }
    },
    error => {
        var errMess= new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {console.log('Post comments', error.message)
        alert('Your comment could not be posted\nError: '+ error.message)})
}

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
});

export const postFeedback = (firstName, lastName, telNum, email, agree, contactType, message) => (dispatch)=> {
        
    const newFeedback= {
        firstname: firstName,
        lastname: lastName,
        telnum: telNum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }

    newFeedback.date = new Date().toISOString();

    return fetch("http://localhost:3001/feedback", {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response=> {
        if(response.ok) {
            alert("Thankyou, your feedback is valued and taken seriously");
            return response;
        } else {
            var error= new Error('Error'+ response.status+ ': '+ response.statusText);
            error.response= response;
            throw error;
        }
    },
    error => {
        var errMess= new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(response => dispatch(addFeedback(response)))
    .catch(error => {console.log('Post comments', error.message)
        alert('Your feedback could not be posted\nError: '+ error.message)})
}
