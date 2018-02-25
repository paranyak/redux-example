import expect from 'expect';
import deepFreeze from 'deep-freeze';

const toogleTodo = (todo) => {
    return Object.assign({}, todo,{
        completed : !todo.completed}
    );
};

const testToogleTodo = () => {
    const todoBefore = {
        id: 0,
        text: "Learn Redux",
        completed: false
    };
    const todoAfter = {
        id: 0,
        text: "Learn Redux",
        completed: true
    };

    deepFreeze(todoBefore);

    expect(
        toogleTodo(todoBefore)
    ).toEqual(todoAfter);
};

testToogleTodo();
console.log("All tests passed");