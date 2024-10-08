
export default function TaskForm() {


  const handleSubmit = (e) => {
    e.preventDefault();
    
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
            required
          />
        </label>
        <label>
          Description
          <textarea
            className='block w-full text-black h-24'
            placeholder="Task Description"
            required
          />
        </label>
        <label>
          Due Date
          <input
          className='block w-full text-black h-10'
            type="date"
            required
          />
        </label>
        <button className='btn-primary mt-5' type="submit">Add Task</button>
      </form>
    </section>
  );
};



