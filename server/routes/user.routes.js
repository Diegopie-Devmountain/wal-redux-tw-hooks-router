import { Router } from "express";
import userData from '../database/user.json' assert { type: 'json' }
import writeToJson from "../controller/writeToJson.js";

const userRouter = Router();

userRouter.get('/data', (req, res) => {
  console.log(userData);
  setTimeout(() => {
    res.status(200).json({success: true, data: userData})
  }, 3000)
})

userRouter.post('/save', ({body}, res) => {
  console.log(body);
  const newUserData = Object.assign(userData, {...body})
  console.log(newUserData);
  
  writeToJson('user', newUserData)
  res.status(200).json({success: true})
})


export default userRouter