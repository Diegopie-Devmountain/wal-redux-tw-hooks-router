import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasks/taskReducer'

export default configureStore({
  reducer: {
    taskState: tasksReducer
  }
})