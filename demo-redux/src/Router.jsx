import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTask from "./pages/CreateTask";
import AllTasks from "./pages/AllTasks";
import User from "./pages/User";
import NotFound from "./pages/NotFound";

export default function Router() {
  const router = createBrowserRouter([
    {
      index: true,
      element: <AllTasks />
    },
    {
      path: 'user',
      element: <User />
    },
    {
      path: 'create',
      element: <CreateTask />
    },
    {
      path: '*', 
      element: <NotFound /> 
    }
  ]);

  return <RouterProvider router={router} />
}