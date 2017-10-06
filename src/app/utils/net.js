/**
 * Created by uroszivaljevic on 10/2/17.
 */
import axios from "axios";

export const BASE_URL = "http://retriever-league.herokuapp.com";

export const resources = {
    DOGS: "/dogs",
    CONTESTS: "/contests",
};

export const configureAxios = () => {
    axios.defaults.baseURL = BASE_URL;
}