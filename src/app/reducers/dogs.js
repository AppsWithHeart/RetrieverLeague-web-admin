/**
 * Created by uroszivaljevic on 10/1/17.
 */

const initialState = [];

export default (state = initialState, action) => {

    switch (action.type) {
        case "GET_DOGS":
            return action.payload.dogs;
        default:
            return state;
    }
}