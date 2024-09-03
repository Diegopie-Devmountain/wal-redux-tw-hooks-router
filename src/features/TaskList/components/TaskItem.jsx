

export default function TaskItem({ task }) {

  return (
    <li className='mt-6 bg-brand-purple-100 text-white py-4 px-8 rounded-md'>
      <div className='flex justify-between h-10'>
        <h3 className='font-matemasie text-lg'>{task.title}</h3>
        <p className='font-semibold'>Due: {task.dueDate}</p>
      </div>
      <p className='min-h-16'>{task.description}</p>
      <div className='flex justify-around'>
        <button
          className='btn-primary'
        >
          {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        <button
          className='btn-primary'
        >Delete</button>
      </div>
    </li>
  );
};


