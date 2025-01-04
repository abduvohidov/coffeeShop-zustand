import {FC, useState} from "react";
import {Card, Checkbox, Flex, TextInput, Text} from "@gravity-ui/uikit";
import {useTodoStore} from "../../entities/Todo";

interface TodoProps {
    className?: string;
}

export const Todo: FC<TodoProps> = (props: TodoProps) => {
    const {className} = props;
    const [value, setValue] = useState('');
    const todos = useTodoStore(state => state.todos);
    const useAddTodo = useTodoStore(state => state.addTodo);
    const useChangeIsCompleted = useTodoStore(state => state.changeIsCompleted);

    return (
        <div className={className}>
            <Flex centerContent={true}>
                <Card view="clear" className="card-todo" width={"auto"}>
                    <Text variant="body-3" color="info">Todo</Text>
                    <TextInput
                        view="normal"
                        size="xl"
                        placeholder="Enter task"
                        pin="round-round"
                        onUpdate={setValue}
                        value={value}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                useAddTodo(value);
                                setValue('');
                            }}
                        }
                    />
                    {todos.map((todo, index) => (
                        <Card className="card-checkbox" view="clear">
                            <Checkbox
                                key={index}
                                size="l"
                                checked={todo.isCompleted}
                                onChange={() => useChangeIsCompleted(index)}
                            >
                                {todo.title}
                            </Checkbox>
                        </Card>
                    ))}
                </Card>
            </Flex>
        </div>
    )
}
