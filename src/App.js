/* @flow */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/* todoSpec
   {
    text: str,
    isChecked: bool,
    toggleCheckbox: (idx) -> void
   }
*/

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        {text: "buy milk", isChecked: false, toggleCheckbox: this.toggleCheckbox}
        {text: "take over the world", isChecked: false, toggleCheckbox: this.toggleCheckbox}
        {text: "eat more veggies", isChecked: false, toggleCheckbox: this.toggleCheckbox}
      ],
    }
  }

  addTodo = todo => {
    this.setState({todos: this.state.todos.concat(
      {text: todo, isChecked: false, toggleCheckbox: this.toggleCheckbox}
    )})
  }

  toggleCheckbox = index => {
    todo_updator = this.state.todos
    todo_updator[index].isChecked = !todo_updator[index].isChecked
    this.setState({todos: todo_updator})
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
    {todos.map((todoSpec, index) => 
        <TodoItem 
          todoText={todoSpec.text} 
          isChecked={todoSpec.isChecked}
          onChange={todoSpec.toggleCheckbox}
          key={index} 
        />
      )
    }
  </ol>


class TodoItem extends Component {
  toggleCheckbox = () => {
    this.setState({isChecked: !this.state.isChecked})
  }
  
  render() {
    return (
      <li>
        <input 
          type="checkbox"
          checked={this.props.isChecked} // added isChecked to props, from state
          onChange={this.props.onChange}
        />
        {this.props.todoText}
      </li>
    );
  }
}

export default App;
