/**
 * Created by uroszivaljevic on 12/3/17.
 */
import { TasksActions } from "../actions/actionTypes";
import initialState from "../store/initialState";

export default (state = initialState.tasks, action) => {
    switch (action.type) {
        case TasksActions.POST_DOG_TASKS_STARTED:
        case TasksActions.GET_TASKS_STARTED:
            return { ...state, isLoading: true };
        case TasksActions.GET_TASKS_SUCCESS:
            return { ...state, tasks: action.payload.tasks, isLoading: false };
        case TasksActions.POST_DOG_TASKS_SUCCESS:
        case TasksActions.POST_DOG_TASKS_FAILED:
        case TasksActions.GET_TASKS_FAILED:
            return { ...state, isLoading: false };
        default:
            return state;
    }
}