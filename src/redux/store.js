import {configureStore} from "@reduxjs/toolkit";
import Quiz from "./Quiz";

export default configureStore({
    reducer: {Quiz}
})