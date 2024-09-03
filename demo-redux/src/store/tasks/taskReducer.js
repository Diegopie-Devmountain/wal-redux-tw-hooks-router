import { ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_COMPLETE, SET_DATA } from './taskActions';

const initialState = {
  tasks: [
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
  ]
};

export default function tasksReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case TOGGLE_COMPLETE:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case SET_DATA: 
      return {
        ...state,
        tasks: action.payload
      }
    default:
      return state;
  }
};
