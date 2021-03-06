import {createStore, combineReducers} from 'redux';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {   //new item representing new adding todo
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id != action.id) {
                return state;
            }
            return Object.assign({}, state, {
                    completed: !state.completed
                }
            );
        default :
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state, //item from old array
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};


const visibilityFilter = (state = 'SHOW_ALL',
                          action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};


const todoApp = combineReducers({

    // keys are the field of state which we're going to manage
    // values are the reducer functions

    todos: todos,  //or just todos
    visibilityFilter: visibilityFilter
});


const store = createStore(todoApp);


let nextTodoId = 0;  // id for every to do
class TodoApp extends Component {
    render() {
        return (
            <div>
                <input ref={node => {
                    this.input = node;
                }}/>
                <button onClick={() => {
                    store.dispatch({    //goes to todoApp
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    this.input.value = '';  // reset input
                }}>
                    Add
                </button>
                <ul>
                    {this.props.todos.map(todo => {
                        return (
                            <li key={todo.id}
                                onClick={() => {
                                    store.dispatch({
                                        type: 'TOGGLE_TODO',
                                        id: todo.id
                                    });
                                }}
                                style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
                                {todo.text}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };
};

const render = () => {
    ReactDOM.render(
        <TodoApp todos={store.getState().todos}/>,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();
