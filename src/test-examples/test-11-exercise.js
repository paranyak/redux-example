import expect from 'expect';
import deepFreeze from 'deep-freeze';

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
            return Object.assign({}, state,{
                completed : !state.completed}
            );
        default :
            return state;}
};

const todos = (state = [], action) => {
    //reducer function
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

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };

    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    }];

    deepFreeze(action);
    deepFreeze(stateBefore);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: false
        }
    ];

    const action = {
        type: 'TOGGLE_TODO',
        id: 0
    };

    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: true
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: false
        }
    ];

    deepFreeze(action);
    deepFreeze(stateBefore);

    expect(todos(stateBefore, action)).toEqual(stateAfter);

};


testAddTodo();

testToggleTodo();
console.log("All tests passed");