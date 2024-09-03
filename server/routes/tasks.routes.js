import { Router } from "express";
import taskData from '../database/tasks.json' assert { type: 'json' }
// import writeToJson from "../controller/writeToJson.js";

const taskRouter = Router();

taskRouter.get('/data', (req, res) => {
  // console.log(taskData);
  setTimeout(() => {
    res.status(200).json({success: true, data: taskData})
  }, 3000)
})


export default taskRouter;