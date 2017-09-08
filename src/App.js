/* @flow */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: ["buy milk", "take over world", "eat more veggies"],
    }
  }

  addTodo = todo => {
    this.setState({todos: this.state.todos.concat(todo)})
  }
  
  render() {
    return (
      <div className="App">
        <AddTodo onAdd={this.addTodo} /> 
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

class AddTodo extends Component {
  constructor(props) {
    super(props)
    
  }

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

const TodoList = ({todos}) => 
  <ol>
    {todos.map((todoText, index) => 
        <TodoItem todoText={todoText} key={index} />)
    }
  </ol>
  

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: false,
    }
  }

  toggleCheckbox = () => {
    this.setState({isChecked: !this.state.isChecked})
  }
  
  render() {
    return (
      <li>
        <input 
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.toggleCheckbox}
        />
        {this.props.todoText}
      </li>
    );
  }
}

export default App;
