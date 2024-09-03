import React from 'react';
// import { useDispatch } from 'react-redux';
// import { toggleComplete, deleteTask } from '../features/tasks/tasksSlice';

export default function TaskItem({ task }) {
  // const dispatch = useDispatch();

  return (
    <li className='mt-6 bg-brand-purple-100 text-white py-4 px-8 rounded-md'>
      <div className='flex justify-between h-10'>
        <h3 className='font-matemasie'>{task.title}</h3>
        <p className='font-semibold'>Due: {task.dueDate}</p>
      </div>
      <p className='min-h-16'>{task.description}</p>
      <div className='flex justify-around'>
        <button
          className='btn-primary'
        // onClick={() => dispatch(toggleComplete(task.id))}
        >
          {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        <button
          className='btn-primary'
        // onClick={() => dispatch(deleteTask(task.id))}
        >Delete</button>
      </div>
    </li>
  );
};


