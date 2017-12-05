/**
 * Created by uroszivaljevic on 12/3/17.
 */
import axios from "axios";
import { Resources } from "../utils/net";
import { TasksActions } from "./actionTypes";


export const getTasks = (contestId) => {
    return dispatch => {
        const url = `${Resources.TASKS}?contestId=${contestId}`;
        dispatch({
            type: TasksActions.GET_TASKS_STARTED,
        });
        axios.get(url)
            .then(response => {
                dispatch({
                    type: TasksActions.GET_TASKS_SUCCESS,
                    payload: {
                        tasks: response.data,
                    },
                });
            })
            .catch(error => {
                dispatch({
                    type: TasksActions.GET_TASKS_FAILED,
                });
            })
    }
}

export const postDogTasks = (dogTasks, contestId, dogId, result) => {
    return dispatch => {
        const params = {
            tasks: dogTasks,
            contestId,
            result,
            dogId,
        };
        console.log(params);
        dispatch({
            type: TasksActions.POST_DOG_TASKS_STARTED,
        });
        axios.post(Resources.DOG_TASKS, params)
            .then(response => {
                dispatch({
                    type: TasksActions.POST_DOG_TASKS_SUCCESS,
                });
            })
            .catch(error => {
                dispatch({
                    type: TasksActions.POST_DOG_TASKS_FAILED,
                });
            });
    }
}