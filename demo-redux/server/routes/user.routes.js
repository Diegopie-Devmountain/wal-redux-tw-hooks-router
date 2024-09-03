import { Router } from "express";
import userData from '../database/user.json' assert { type: 'json' }
import writeToJson from "../controller/writeToJson.js";

const userRouter = Router();

userRouter.get('/data', (req, res) => {
  res.status(200).json({success: true, data: userData})
})

userRouter.post('/save', ({body}, res) => {
  const newUserData = Object.assign(userData, {...body})
  console.log(newUserData);
  
  writeToJson('user', newUserData)
  res.status(200).json({success: true})
})


export default userRouter