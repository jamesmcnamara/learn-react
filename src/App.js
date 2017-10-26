/* @flow */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

/* todoSpec
   {
    text: str,
    isChecked: bool,
    toggleCheckbox: (idx) -> void
   }
*/

const initialState = global.initialState = {
    todos: [
      {text: "buy milk", isChecked: false},
      {text: "take over the world", isChecked: false},
      {text: "eat more veggies", isChecked: false},
    ],
}

const ADD_TODO = 'ADD_TODO'
const CHECK_TODO = 'CHECK_TODO'
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

const reducer = global.reducer = function reducer(state = initialState, action) {
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
  return state
}

class App extends Component {
  addTodo = todo => {
    this.setState({todos: this.state.todos.concat(
      {text: todo, isChecked: false}
    )})
  }

  toggleCheckbox = index => {
    this.setState({todos: this.state.todos.map((todo, idx) =>
      idx === index
      ? {
          ...todo,
        isChecked: !todo.isChecked,
      }
      : todo)})
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

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

export default App;
