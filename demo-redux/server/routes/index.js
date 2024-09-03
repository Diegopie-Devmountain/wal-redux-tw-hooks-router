import { Router } from "express";
import userRouter from "./user.routes.js";

const appRouter = Router();

appRouter.use('/api/user', userRouter);


export default appRouter