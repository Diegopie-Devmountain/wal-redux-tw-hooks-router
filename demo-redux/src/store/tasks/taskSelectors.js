export const selectTasks = (state) => state.tasksState.tasks;

export const selectFilteredTasks = (state, filter) => {
  
  switch (filter)  {
    case 'completed': 
      return state.taskState.tasks.filter(task => task.completed);
    case 'pending':
      return state.taskState.tasks.filter(task => !task.completed);
    default:
      return state.taskState.tasks;
  }
};
