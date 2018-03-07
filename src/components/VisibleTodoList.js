import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';

import * as actions from '../actions'
import TodoList from './TodoList';
import {getVisibleTodos, getIsFetching} from '../reducers'

class VisibleTodoList extends Component {
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const { filter, requestTodos, fetchTodos } = this.props;
        requestTodos(filter);
        fetchTodos(filter);
    }

    render() {
        const { toggleTodo, todos, isFetching } = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>;
        }
        return (
            <TodoList
                todos={todos}
                onTodoClick={toggleTodo}
            />
        );
    }
}


const mapStateToProps = (state, {match}) => {
    const filter = match.params.filter || 'all';
    return {
        isFetching: getIsFetching(state, filter),
        todos: getVisibleTodos(state, filter),
        filter
    }

};

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList));


export default VisibleTodoList;