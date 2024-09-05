import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";

const userState = {
  id: 0,
  name: '',
  role: '',
  level: '',
  salary: "",
  error: null,
  errorMessage: ''
}

export const getUserThunk = async (dispatch) => {
  dispatch({type: 'SET_LOADING'});
  try {
    const userData = await axios.get("/api/user/data").then(res => res.data)
    console.log(userData);
    dispatch({type: "SET_DATA", payload: userData.data})  
  } catch (err) {
    console.error("error getting user data: ", err);
    dispatch({
      type: "SET_ERROR",
      payload: "Error Getting user data, refresh to try again"
    })
  }
}

//{ type: 'what to do', payload: 'data to set'}
function userReducer(state = userState, action) {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, ...action.payload, loading: false }
    case "UPDATE":
      console.log(action.payload);
      
      const { nameData: name, roleData: role } = action.payload;
      // axios.post('/api/user/save', {name, role})
      return {...state, name, role}
    case "SET_LOADING":
      return {...state, loading: true}
    case "SET_ERROR": 
      return {...state, error: true, errorMessage: action.payload}
    default: 
     return state;
  }
}

export default configureStore({
  reducer: userReducer
})