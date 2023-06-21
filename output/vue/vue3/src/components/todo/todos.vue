<template>
  <section class="main">
    <template v-if="todosState.todos.length">
      <input
        class="toggle-all"
        type="checkbox"
        :checked="todosState.allCompleted"
        @click="
          const newValue = !todosState.allCompleted;
          for (const todoItem of todosState.todos) {
            todoItem.completed = newValue;
          }
        "
      />
    </template>

    <ul class="todo-list">
      <template :key="index" v-for="(todo, index) in todosState.todos">
        <todo :todo="todo"></todo>
      </template>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import todosState from "./todos-state";
import Todo from "./todo.vue";

export type TodosProps = {};

export default defineComponent({
  name: "todos",
  components: { Todo: Todo },

  data() {
    return { todosState };
  },
});
</script>