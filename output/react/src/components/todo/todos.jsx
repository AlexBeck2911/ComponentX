import * as React from "react";
import todosState from "./todos-state";
import Todo from "./todo";

function Todos(props) {
  return (
    <section className="main">
      {todosState.todos.length ? (
        <>
          <input
            className="toggle-all"
            type="checkbox"
            checked={todosState.allCompleted}
            onClick={(event) => {
              const newValue = !todosState.allCompleted;
              for (const todoItem of todosState.todos) {
                todoItem.completed = newValue;
              }
            }}
          />
        </>
      ) : null}

      <ul className="todo-list">
        {todosState.todos?.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </section>
  );
}

export default Todos;
