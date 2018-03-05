import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';

import {toggleTodo} from '../actions';
import TodoList from './TodoList';
import {getVisibleTodos} from '../reducers'
import {fetchTodos} from "../api/index";

class VisibleTodoList extends Component {
    componentDidMount() {
        fetchTodos(this.props.filter).then(todos =>
            console.log(this.props.filter, todos)
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            fetchTodos(this.props.filter).then(todos =>
                console.log(this.props.filter, todos)
            );
        }
    }

    render() {
        return <TodoList {...this.props}/>
    }
}


const mapStateToProps = (state, {match}) => {
    const filter = match.params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        filter
    }

};


VisibleTodoList = withRouter(connect(
    mapStateToProps,
    {onTodoClick: toggleTodo}
)(VisibleTodoList));


export default VisibleTodoList;