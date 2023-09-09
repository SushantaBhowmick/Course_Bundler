import axios from "axios";
import { server } from "../store";


export const createCourse = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        };

        dispatch({ type: "createCourseRequest" })

        const { data } = await axios.post(
            `${server}/createcourse`,
            formData,
            config,
            )

        dispatch({
            type: "createCourseSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "createCourseFail",
            payload: error.response.data.message
        })

    }
}
