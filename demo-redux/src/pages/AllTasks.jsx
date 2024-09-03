import { useEffect, useState } from "react";
import TaskList from "../features/TaskList/TaskList";
import { useDispatch } from "react-redux";
import { getTaskThunk } from "../store/tasks/taskThunks";


export default function AllTasks() {

  const [filter, setFilter] = useState('all');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTaskThunk)
  }, [])

  return (
    <main>
      AllTasks page
      <div className='bg-brand-orange-300 h-10 w-5/6 m-auto flex justify-around mt-8'>
        <button
          className="hover:font-bold"
          onClick={() => setFilter('all')}
        >All</button>
        <button
          className="hover:font-bold"
          onClick={() => setFilter('completed')}
        >Completed</button>
        <button
          className="hover:font-bold"
          onClick={() => setFilter('pending')}
        >Pending</button>
      </div>
      <TaskList filter={filter}/>
    </main>
  )
}