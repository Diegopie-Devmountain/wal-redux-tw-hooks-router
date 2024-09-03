import React from 'react';
// import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
// import { selectFilteredTasks } from '../features/tasks/tasksSelectors';

export default function TaskList ({ filter })  {
  // const tasks = useSelector((state) => selectFilteredTasks(state, filter));

  const tasks = [
    {
      id: 1,
      title: "Complete Redux Tutorial",
      description: "Finish the Redux documentation and complete the example project.",
      dueDate: "2024-08-30",
      completed: false,
    },
    {
      id: 2,
      title: "Prepare Presentation",
      description: "Create slides for the upcoming team meeting.",
      dueDate: "2024-09-01",
      completed: true,
    },
    {
      id: 3,
      title: "Update Website",
      description: "Revamp the landing page with the new design.",
      dueDate: "2024-09-05",
      completed: false,
    },
  ];

  return (
    <ul className='w-4/5 m-auto mt-8 md:w-2/3'>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
