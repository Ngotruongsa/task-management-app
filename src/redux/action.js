export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const UNCOMPLETE_TASK = 'UNCOMPLETE_TASK';

export const addTask = (title, description, deadline, assignedTo, assignedBy) => {
    return {
        type: 'ADD_TASK',
        payload: {title, description, deadline, assignedTo, assignedBy},
    }
}

export const deleteTask = (index) => {
    return {
        type: 'DELETE_TASK',
        payload: index,
    }
}

export const editTask = (index, title, description, deadline, assignedTo, assignedBy) => {
    return {
        type: 'EDIT_TASK',
        payload: {index, title, description, deadline, assignedTo, assignedBy},
    }
}

export const completeTask = (index) => {
    return {
        type: 'COMPLETE_TASK',
        payload: index,
    }
}

export const uncompleteTask = (index) => {
    return {
        type: 'UNCOMPLETE_TASK',
        payload: index,
    }
}


