import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

export type TodoProps = {
  todo: TodoType;
};

import todosState from "./todos-state";
import type { Todo as TodoType } from "./todos-state";

@Component({
  selector: "todo, Todo",
  template: `
    <li
      [class]="\`\${todo.completed ? 'completed' : ''} \${editing ? 'editing' : ''}\`"
    >
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          [attr.checked]="todo.completed"
          (click)="
          toggle();
        "
        />

        <label
          (dblClick)="
          editing = true;
        "
        >
          {{todo.text}}
        </label>

        <button
          class="destroy"
          (click)="
          todosState.todos.splice(todosState.todos.indexOf(todo));
        "
        ></button>
      </div>

      <ng-container *ngIf="editing">
        <input
          class="edit"
          [attr.value]="todo.text"
          (blur)="
          editing = false;
        "
          (keyUp)="
          todo.text = $event.target.value;
        "
        />
      </ng-container>
    </li>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class Todo {
  todosState = todosState;

  @Input() todo: TodoProps["todo"];

  editing = false;
  toggle() {
    const newBool: boolean = !this.todo.completed;
    this.todo.completed = newBool;
  }
}
