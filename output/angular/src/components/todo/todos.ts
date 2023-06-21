import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

export type TodosProps = {};

import todosState from "./todos-state";
import Todo from "./todo";

@Component({
  selector: "todos, Todos",
  template: `
    <section class="main">
      <ng-container *ngIf="todosState.todos.length">
        <input
          class="toggle-all"
          type="checkbox"
          [attr.checked]="todosState.allCompleted"
          (click)="
          const newValue = !todosState.allCompleted;
          for (const todoItem of todosState.todos) {
            todoItem.completed = newValue;
          }
        "
        />
      </ng-container>

      <ul class="todo-list">
        <ng-container *ngFor="let todo of todosState.todos">
          <todo [todo]="todo"></todo>
        </ng-container>
      </ul>
    </section>
  `,
  standalone: true,
  imports: [CommonModule, Todo],
})
export class Todos {
  todosState = todosState;
}
