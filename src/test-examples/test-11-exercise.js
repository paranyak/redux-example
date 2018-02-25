import expect from 'expect';
import deepFreeze from 'deep-freeze';

const todos = (state = [], action) => {
    //reducer function
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state, //item from old array
                {   //new item representing new adding todo
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        case 'TOGGLE_TODO':
            return state.map(todo => {
                if (todo.id != action.id) {
                    return todo;
                }
                return Object.assign({}, todo,{
                    completed : !todo.completed}
                );
            });
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
console.log("All tests passed!");