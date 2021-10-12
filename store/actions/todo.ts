import { TodoState, TodoAction } from '../../types';

export const addTodo = ({ id, title, time }: TodoState): TodoAction => {
    return {
        type: 'ADD_TODO',
        id,
        title,
        time
    };
};

export const deleteTodo = ({ id, title, time }: TodoState): TodoAction => {
    return {
        type: 'DELETE_TODO',
        id,
        title,
        time
    };
};

export const updateTodo = ({ id, title, time }: TodoState): TodoAction => {
    return {
        type: 'UPDATE_TODO',
        id,
        title,
        time
    };
};
