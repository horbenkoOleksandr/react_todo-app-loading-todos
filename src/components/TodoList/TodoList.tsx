import React from "react"
import { TodoItem } from "../TodoItem"
import { Todo } from "../../types/Todo"
import { TodoLoader } from "../TodoLoader"

type Props = {
    todos: Todo[]
    isLoadingTodos: boolean
    filter: 'All' | 'Active' | 'Сompleted'
    onToggle: (id: number) => void
}
export const TodoList: React.FC<Props> = ({todos, isLoadingTodos, onToggle, filter}) => {
    const filteredTodos = todos.filter((todo) => {
        if (filter === 'All') return true;
        if (filter === 'Active') return !todo.completed;
        return todo.completed
    })

    return (
        <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map((todo) => (
                <TodoItem 
                  todo={todo}
                  isLoadingTodos={isLoadingTodos}
                  key={todo.id}
                  onToggle={onToggle}
                />
            ))}
        </section>  
    )
}
