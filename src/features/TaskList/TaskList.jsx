import TaskItem from './components/TaskItem';

export default function TaskList ({ filter })  {
  const tasks = [];

  return (
    <ul className='w-4/5 m-auto mt-8 md:w-2/3'>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
