/* @flow */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'

/* todoSpec
   {
    text: str,
    isChecked: bool,
    toggleCheckbox: (idx) -> void
   }
*/


const initialState = global.initialState = {
  auth: {
    isLoggedIn: true,
  },
  todoPage: {
    currentFilter: null,
    todos: [
      {text: "buy milk", isChecked: false},
      {text: "take over the world", isChecked: false},
      {text: "eat more veggies", isChecked: false},
    ],
  },
}

const ADD_TODO = 'ADD_TODO'
const CHECK_TODO = 'CHECK_TODO'
const SELECT_FILTER = 'SELECT_FILTER'

const addTodo = global.addTodo = function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: {
      text,
      isChecked: false,
    }
  }
}

const checkTodo = global.checkTodo = function checkTodo(index) {
  return {
    type: CHECK_TODO,
    index,
  }
}

const selectFilter = global.selectFilter= function selectFilter(filter) {
  return {
    type: SELECT_FILTER,
    payload: filter,
  }
}

const todoPage = global.reducer = function (state = initialState.todoPage, action) {
  if (action && action.type === ADD_TODO) {
    return {
      ...state,
      todos: state.todos.concat(action.payload)
    }
  }
  if (action && action.type === CHECK_TODO) {
    const todos = state.todos.slice()
    todos[action.index].isChecked = !todos[action.index].isChecked 
    return {
      ...state,
      todos,
    }
  }

  if (action && action.type === SELECT_FILTER) {
    return {
      ...state,
      currentFilter: action.payload,
    }
  }
  return state
}

function auth(state = initialState.auth, action) {
  return state
}

const availableFilters = [
  'checked',
  'unchecked',
]

const reducer = combineReducers({
  todoPage,
  auth,
})


const filterTodos = (todos, filter) => {
  if (filter) {
    const flag = filter == 'checked'
    return todos.filter(todo => todo.isChecked == flag)
  }
  return todos
}

export const store = window.store = createStore(reducer)

const mapStateToProps = ({todoPage: {todos, currentFilter}}) => 
  ({todos: filterTodos(todos, currentFilter),
    currentFilter,
  })

export const App = connect(mapStateToProps)
(class App extends Component {
  render() {
    return (
      <div className="App">
        <AddTodo onAdd={(todo) => this.props.dispatch(addTodo(todo))} />
        {availableFilters.map((filter, idx) =>
          <Filter 
            isSelected={filter == this.props.currentFilter}
            name={filter} 
            onClick={(filter) => this.props.dispatch(selectFilter(filter))} 
            key={idx} 
          />)
        }
        <TodoList 
          todos={this.props.todos} 
          toggleCheckbox={index => this.props.dispatch(checkTodo(index))} 
        />
      </div>
    );
  }
})

class AddTodo extends Component {

  onClick = () => {
    this.props.onAdd(this.todoText.value)
    this.todoText.value = '';
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={ref => this.todoText = ref}
          placeholder="What do you need to do?"
        />
        <input
          type="button"
          value="Add todo!"
          onClick={this.onClick}
        />
      </div>
    )
  }
}

const TodoList = ({todos, toggleCheckbox}) => 
  <ol>
    {todos.map((todoSpec, index) => 
        <TodoItem 
          todoText={todoSpec.text} 
          isChecked={todoSpec.isChecked}
          onChange={() => toggleCheckbox(index)}
          key={index} 
        />
      )
    }
  </ol>


class TodoItem extends Component {
  render() {
    return (
      <li>
        <input 
          type="checkbox"
          checked={this.props.isChecked}
          onChange={this.props.onChange}
        />
        {this.props.todoText}
      </li>
    );
  }
}

function Filter({name, onClick, isSelected}) {
  return (
    <div style={{fontWeight: isSelected ? 'bold' : 'normal'}} onClick={() => onClick(name)}>
      {name}
    </div>
  )
}
