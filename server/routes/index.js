import { Router } from "express";
import taskRouter from "./tasks.routes.js";
import userRouter from "./user.routes.js";

const appRouter = Router();

appRouter.use('/api/tasks', taskRouter);
appRouter.use('/api/user', userRouter);


export default appRouter;