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


testAddTodo();
console.log("All tests passed!");