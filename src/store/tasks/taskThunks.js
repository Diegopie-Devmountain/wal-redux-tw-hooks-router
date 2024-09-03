import axios from "axios";

export const getTaskThunk = async (dispatch) => {
  try {
    const taskData = await axios.get("/api/tasks/data").then((res) => res.data);
    console.log(taskData);
    dispatch({ type: "SET_DATA", payload: taskData.data });
  } catch (err) {
    console.error("Error getting user data: ", err);
  }
};