export type TodoType  = {
    title: string;
    isCompleted: boolean;
}

export type TodoState = {
    todos: TodoType[]
}

export type TodoActions = {
    addTodo: (todo: string) => void;
    changeIsCompleted: (index: number) => void;
}
