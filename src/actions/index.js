import { v4 } from 'node-uuid'
import * as api from '../api'

export const fetchTodos = (filter) =>
    api.fetchTodos(filter).then(response =>
        receiveTodos(filter, response)
    );

export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});


export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id,
    };
};

export const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response,
});