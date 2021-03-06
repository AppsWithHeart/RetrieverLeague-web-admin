/**
 * Created by uroszivaljevic on 10/1/17.
 */
import {
    combineReducers,
    createStore,
    applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import dogsReducer from "../reducers/dogs";
import leaguesReducer from "../reducers/leagues";
import contestsReducer from "../reducers/contests";
import tasksReducer from "../reducers/tasks";


const reducers = combineReducers({
    dogs: dogsReducer,
    leagues: leaguesReducer,
    contests: contestsReducer,
    tasks: tasksReducer,
});

const store = createStore(
    reducers,
    applyMiddleware(thunk, logger)
);

export default store;