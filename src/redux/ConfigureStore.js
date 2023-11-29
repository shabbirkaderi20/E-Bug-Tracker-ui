import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import {Leaders} from './objects/leaders';
import {Projects} from './objects/projects';
import {Bugs} from './objects/bugs';
import {Comments} from './objects/comments';
import logger from 'redux-logger';
import { InitialFeedback } from './objects/forms';

export const ConfigureStore = () => {
    const store= createStore(
        combineReducers({
            leaders: Leaders,
            projects: Projects,
            bugs: Bugs,
            comments: Comments,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}