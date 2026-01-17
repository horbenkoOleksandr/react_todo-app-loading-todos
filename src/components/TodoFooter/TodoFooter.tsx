import React from "react"
import { Todo } from "../../types/Todo"
import { TodoFilter } from "../TodoFilter"

type Props = {
    todos: Todo[]
    filter: 'All' | 'Active' | 'Сompleted'
    setFilter: (value: 'All' | 'Active' | 'Сompleted') => void;
}
export const TodoFooter: React.FC<Props> = ({todos, filter, setFilter}) => {
    const completedTodo = todos.some((todo) => todo.completed === true);
    const filteredCompletedTodo = todos.filter((todo) => !todo.completed).length;
    return (
        <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${filteredCompletedTodo} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <TodoFilter
              filter={filter}
              setFilter={setFilter}
            />

            {/* this button should be disabled if there are no completed todos */}
            <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={!completedTodo}
            >
                Clear completed
            </button>
        </footer>
    )
}