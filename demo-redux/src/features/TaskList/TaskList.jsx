import TaskItem from './components/TaskItem';
import { useSelector } from 'react-redux';
import { selectFilteredTasks } from '../../store/tasks/taskSelectors';

export default function TaskList ({ filter })  {
  // const tasks = [];
  const tasks = useSelector((state) => selectFilteredTasks(state, filter));

  return (
    <ul className='w-4/5 m-auto mt-8 md:w-2/3'>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
