import React from "react";
import "./App.css";

function Todo({ todo, index, editTodo, removeTodo }) {
  return (
      <div
          className="todo"
      >
        {todo.text}
        <div>
          <button onClick={() => editTodo(index)}>Edit</button>
          <button onClick={() => removeTodo(index)}>Delete</button>
        </div>
      </div>
  );
}

function TodoForm({ addTodo, editText, editBool }) {
  const [value, setValue] = React.useState("");
  const [changeValue, setChangeValue] = React.useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
    setChangeValue(false);
  };

  const onChange = e => {
    setValue(e.target.value);
    !changeValue && setChangeValue(true);
  }

  return (
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            className="input"
            value={(!editBool || changeValue) ? value : editText}
            placeholder="Enter a new Todo"
            onChange={onChange}
        />
      </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Wake Early and Do exercise"
    },
    {
      text: "Meet friend for lunch"
    },
    {
      text: "Build really cool apps"
    }
  ]);

  const [editText, setEditText] = React.useState("");
  const [editBool, setEditBool] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(0);

  const addTodo = text => {
    console.log('Text is: ', text);
    const newTodos = [...todos, { text }];
    if (editIndex > 0) {
      const editTodo = [...todos];
      editTodo[editIndex - 1].text = text;
      setTodos(editTodo);
      setEditBool(false);
      setEditIndex(0);
    }
    else {
      setTodos(newTodos);
    }
    setEditText("");
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = index => {
    const editTodo = [...todos];
    console.log('EditTodo is: ', editTodo[index]);
    setEditText(editTodo[index].text);
    setEditBool(true);
    setEditIndex(index + 1);
  }

  return (
      <div className="app">
        <div className="todo-list">
          {todos.map((todo, index) => (
              <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  editTodo={editTodo}
                  removeTodo={removeTodo}
              />
          ))}
          <TodoForm addTodo={addTodo} editText={editText} editBool={editBool} />
        </div>
      </div>
  );
}

export default App;
