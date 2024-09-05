import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllTasks from './pages/AllTasks';
import  CreateTask from './pages/CreateTask'
import  NotFound from './pages/NotFound'
import  User from './pages/User/User'
import App from './App'

export default function Router() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <AllTasks />
        },
        {
          path: '/user',
          element: <User />
        },
        {
          path: '/create',
          element: <CreateTask />
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}