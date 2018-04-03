/**
 * Created by uroszivaljevic on 10/1/17.
 */
import axios from "axios";

import { DogsActions } from "./actionTypes";
import { Resources } from "../utils/net";

export const getDogs = () => {

    return dispatch => {
        dispatch({ type: DogsActions.GET_DOGS_STARTED });
        axios.get(Resources.DOGS)
            .then(response => {
                dispatch({
                    type: DogsActions.GET_DOGS_SUCCESS,
                    payload: {
                        dogs: response.data
                    }
                });
            })
            .catch(error => {
                dispatch({
                    type: DogsActions.GET_DOGS_FAILED,
                })
            });
    }
};

export const addDog = (dog) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(Resources.DOGS, dog)
                .then(response => {
                    dispatch({
                        type: DogsActions.ADD_DOG_SUCCESS,
                        payload: {
                            dog: response.data
                        }
                    });
                    resolve();
                })
                .catch(error => {
                    dispatch({
                        type: DogsActions.ADD_DOG_FAILED,
                    });
                    reject();
                })
        });
    }
};