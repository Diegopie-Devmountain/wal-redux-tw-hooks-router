import { useRef } from 'react';
import useFormData from '../hooks/userFormRef';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../store/tasks/taskActions';

export default function TaskForm() {
  const title = useRef(null);
  const description = useRef(null);
  const dueDate = useRef(null);
  console.log(title.current?.value);

  const [allFormData, resetFormData] = useFormData({title, description, dueDate})

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(allFormData());
    
    const {title, description, dueDate} = allFormData();
    dispatch(addTask({ id: Date.now(), title, description, dueDate, completed: false }));
    resetFormData()
  };

  return (
    <section className='w-4/5 m-auto mt-8 md:w-1/2 bg-brand-purple-100 py-4 px-8 rounded-md text-white'>
      <h1 className='title-primary'>Create a Task</h1>
      <form 
        onSubmit={handleSubmit}
        className='flex flex-col gap-y-5 mt-6'
      >
        <label>
          Title
          <input
            className='block w-full text-black h-10'
            type="text"
            placeholder="Task Title"
            ref={title}
            required
          />
        </label>
        <label>
          Description
          <textarea
            className='block w-full text-black h-24'
            placeholder="Task Description"
            ref={description}
            required
          />
        </label>
        <label>
          Due Date
          <input
          className='block w-full text-black h-10'
            type="date"
            ref={dueDate}
            required
          />
        </label>
        <button className='btn-primary mt-5' type="submit">Add Task</button>
      </form>
    </section>
  );
};



