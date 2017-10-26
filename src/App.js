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
        {text: "buy milk", isChecked: false},
        {text: "take over the world", isChecked: false},
        {text: "eat more veggies", isChecked: false},
      ],
    }
  }

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
        <AddTodo onAdd={this.addTodo} /> 
        <TodoList todos={this.state.todos} toggleCheckbox={this.toggleCheckbox} />
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
