import { ADD_TASK, COMPLETE_TASK, UNCOMPLETE_TASK, DELETE_TASK, EDIT_TASK } from "./action";

// Function to load state from LocalStorage if available
const loadStateFromLocalStorage = () => {
  try {
    const storedState = typeof window !== 'undefined' && window.localStorage && localStorage.getItem('tasksState');
    return storedState ? JSON.parse(storedState) : { tasks: [] };
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return { tasks: [] }; // Return initial state if unable to load from localStorage
  }
};

// Load state from LocalStorage if available, or use the initial state
const initialState = loadStateFromLocalStorage();

const rootReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case ADD_TASK:
      newState = {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
      break;
    case DELETE_TASK:
      newState = {
        ...state,
        tasks: state.tasks.filter((task, index) => index !== action.payload),
      };
      break;
    case EDIT_TASK:
      const editedTasks = [...state.tasks];
      editedTasks[action.payload.index] = {
        title: action.payload.title,
        description: action.payload.description,
        deadline: action.payload.deadline,
        assignedTo: action.payload.assignedTo,
        assignedBy: action.payload.assignedBy,
      };
      newState = {
        ...state,
        tasks: editedTasks,
      };
      break;
    case COMPLETE_TASK:
      const completedTasks = [...state.tasks];
      completedTasks[action.payload].completed = true;
      newState = {
        ...state,
        tasks: completedTasks,
      };
      break;
    case UNCOMPLETE_TASK:
      const uncompletedTasks = [...state.tasks];
      uncompletedTasks[action.payload].completed = false;
      newState = {
        ...state,
        tasks: uncompletedTasks,
      };
      break;
    default:
      newState = state;
  }

  // Save the updated state to LocalStorage (if available)
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('tasksState', JSON.stringify(newState));
  }

  return newState;
};

export default rootReducer;
