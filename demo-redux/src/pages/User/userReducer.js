import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";

const userState = {
  id: 0,
  name: "",
  role: "",
  level: "",
  salary: 0,
  loading: true,
  error: null,
  errorMessage: "",
};

export const getUserThunk = async (dispatch) => {
  dispatch({ type: "SET_LOADING" });
  try {
    const userData = await axios.get("/api/user/data").then((res) => res.data);
    console.log(userData);
    dispatch({ type: "SET_DATA", payload: userData.data });
  } catch (err) {
    console.error("Error getting user data: ", err);
    dispatch({
      type: "SET_ERROR",
      payload: "Error getting user data, refresh to try again",
    });
  }
};

function userReducer(state = userState, action) {
  switch (action.type) {
    case "SET_DATA":
      console.log(state);
      return { ...state, ...action.payload, loading: false };
    case "UPDATE":
      const { nameData: name, roleData: role } = action.payload;
      console.log({ name, role });
      axios.post("/api/user/save", { name, role });
      return { ...state, name, role };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_ERROR":
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return state;
  }
}

export default configureStore({
  reducer: userReducer,
});
