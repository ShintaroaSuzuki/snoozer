import { initialTodoState } from '../initialState';
import { TodoState, TodoAction } from '../../types';

export const todoReducer = (
    state = initialTodoState,
    action: TodoAction
): TodoState[] => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                { id: action.id, title: action.title, time: action.time }
            ];
        case 'DELETE_TODO':
            return state.filter((e) => e.id != action.id);
        case 'UPDATE_TODO':
            return state.map((todo) =>
                todo.id == action.id
                    ? { ...todo, title: action.title, time: action.time }
                    : todo
            );
        default:
            return state;
    }
};
