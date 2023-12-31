import "./App.css";
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTodo: "There's always something to do...", //Default state
    };
  }

  // Add a todo
  addTodo = (title) => {
    fetch("addTodo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ todos: data });
      })
      .catch((error) => {
        this.setState({ message: error });
      });
  };

  // Remove a todo
  deleteTodo = (title) => {
    fetch("deleteTodo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ todos: data });
      })
      .catch((error) => {
        this.setState({ message: error });
      });
  };

  // Clear list
  clearList = () => {
    fetch("clearList", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ todos: data });
      })
      .catch((error) => {
        this.setState({ message: error });
      });
  };

  render() {
    return (
      <div id="container">
        <Header />
        <AddTodo addTodo={this.addTodo} />
        <Todos deleteTodo={this.deleteTodo} />
        <ClearTodos clearList={this.clearList} />
      </div>
    );
  }
}

class AddTodo extends React.Component {
  state = {
    title: "",
  };

  changing = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
          <input
            type="text"
            name="title"
            placeholder="Add a Todo..."
            style={{ flex: "10", padding: "5px" }}
            onChange={this.changing}
          />
          <input
            type="submit"
            value="Submit"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    );
  }
}

class Todos extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      message: null,
    };
  }

  loadTodos(props) {
    this.setState({ message: "Loading Todos..." });
    fetch("getTodos")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ list: data, message: null });
      })
      .catch((error) => {
        this.setState({ message: error });
      });
  }

  componentWillReceiveProps(props) {
    this.loadTodos(props);
  }

  componentDidMount() {
    this.loadTodos(this.props);
  }

  onRemove(title) {
    this.props.deleteTodo(title);
  }

  render() {
    return (
      <div id="todosDisplay">
        {this.state.message ? (
          <p className="message">{this.state.message}</p>
        ) : (
          <ul>
            {this.state.list.map((item) => (
              <li key={item.title}>
                <span id="todo">{item.title}</span>
                <span id="removeTodo">
                  <button
                    onClick={() => this.onRemove(item.title)}
                    id="removeBtn"
                  >
                    Remove
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

class ClearTodos extends React.Component {
  onClear = (e) => {
    this.props.clearList();
  };

  render() {
    return (
      <div id="clearTable">
        <button onClick={() => this.onClear()} id="clearBtn">
          Clear List
        </button>
      </div>
    );
  }
}

function Header() {
  return (
    <header id="headerStyle">
      <h1> Todo List </h1>
    </header>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
