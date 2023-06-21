<template>
  <li
    :class="
      _classStringToObject(
        `${todo.completed ? 'completed' : ''} ${editing ? 'editing' : ''}`
      )
    "
  >
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        :checked="todo.completed"
        @click="toggle()"
      />
      <label @dblclick="editing = true">
        {{ todo.text }}
      </label>
      <button
        class="destroy"
        @click="todosState.todos.splice(todosState.todos.indexOf(todo))"
      ></button>
    </div>

    <template v-if="editing">
      <input
        class="edit"
        :value="todo.text"
        @blur="editing = false"
        @keyup="todo.text = $event.target.value"
      />
    </template>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import todosState from "./todos-state";
import type { Todo as TodoType } from "./todos-state";

export type TodoProps = {
  todo: TodoType;
};

export default defineComponent({
  name: "todo",

  props: ["todo"],

  data() {
    return { editing: false, todosState };
  },

  methods: {
    toggle() {
      const newBool: boolean = !this.todo.completed;
      this.todo.completed = newBool;
    },
    _classStringToObject(str: string) {
      const obj: Record<string, boolean> = {};
      if (typeof str !== "string") {
        return obj;
      }
      const classNames = str.trim().split(/\s+/);
      for (const name of classNames) {
        obj[name] = true;
      }
      return obj;
    },
  },
});
</script>