import {create, StateCreator} from 'zustand'
import {devtools} from "zustand/middleware";
import {TodoActions, TodoState, TodoType} from "./model";

const todoSlice: StateCreator<
    TodoState & TodoActions,
    [["zustand/devtools", never]]
> = (set, get) => ({
    todos: [],
    addTodo: (todo: string) => {
        const {todos} = get();
        set({todos: [...todos, {title: todo, isCompleted: false}]}, false, `add todo: ${todo}`)
    },
    changeIsCompleted: (index: number) => {
        const {todos} = get();
        const newTodos: TodoType[] = [
            ...todos.slice(0, index),
            {...todos[index], isCompleted: !todos[index].isCompleted},
            ...todos.slice(index + 1)
        ]
        set({todos: newTodos}, false, `changeIsCompleted: ${todos[index].title} to ${newTodos[index].isCompleted}`)
    }
})

export const useTodoStore = create<TodoState & TodoActions>()(devtools(todoSlice))
