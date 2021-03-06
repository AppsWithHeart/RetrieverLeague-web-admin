/**
 * Created by uroszivaljevic on 10/2/17.
 */
import axios from "axios";

export const BASE_URL = "https://retriever-league.herokuapp.com";
// export const BASE_URL = "http://localhost:3000";

export const Resources = {
    DOGS: "/dogs",
    CONTESTS: "/contests",
    LEAGUES: "/leagues",
    TASKS: "/tasks",
    DOG_TASKS: "/tasks/dog",
};

export const configureAxios = () => {
    axios.defaults.baseURL = BASE_URL;
};