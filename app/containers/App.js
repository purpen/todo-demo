import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import {
  addTodo,
  completeTodo,
  setVisibilityFilter,
  VisibilityFilters,
} from "../actions";


import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from "../components/Footer";

class App extends Component {

  render() {
    const { dispatch, visibleTodos, visibilityFilter } = this.props;
    return (
      <div>
        <h1>Mini Task List</h1>
        <AddTodo onAddClick={text =>
          dispatch(addTodo(text))
        } />
        <TodoList onTodoClick={index =>
          dispatch(completeTodo(index))
        } todos={visibleTodos}
        />
        <Footer onFilterChange={nextFilter=>
          dispatch(setVisibilityFilter(nextFilter))
        } filter={visibilityFilter}/>
      </div>
    );
  }
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

export default connect(select)(App);
