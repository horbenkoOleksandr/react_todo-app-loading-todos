/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { client } from './utils/fetchClient';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isHidden, setIsHidden] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Сompleted'>('All')
  
  useEffect(() => {
    setErrorMessages([]);
    client.get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then((todosFromServer) => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setErrorMessages(['Unable to load todos'])
        setIsHidden(false);
        setTimeout(() => setIsHidden(true), 3000);
      })
      .finally(() => {
        setIsLoadingTodos(false);
      })
  }, []);
  const getIdTodo = (todos: Todo[]) => {
    if (todos.length === 0) return 1;
    const maxId = Math.max(...todos.map(todo => todo.id))
    return maxId + 1;
  }
  const addTodo = (title: string) => {
    if (title.trim() === '') {
      setErrorMessages(['Title should not be empty'])
      setIsHidden(false);
      setTimeout(() => setIsHidden(true), 3000); 
      return;
    };
    const newTodo = {
      id: getIdTodo(todos),
      userId: USER_ID,
      title,
      completed: false
    };
    setTodos(prevTodo => [...prevTodo, newTodo]);
  };
  const toggleTodo = (id: number) => {
    setTodos(prevTodo =>
      prevTodo.map((todo) => 
        todo.id === id
          ? {...todo, completed: !todo.completed}
          : todo
      )
    )
  }
  
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader 
          onAddTodo={addTodo}
          todos={todos}
        />

        <TodoList
          todos={todos}
          isLoadingTodos={isLoadingTodos}
          filter={filter}
          onToggle={toggleTodo}
        />

        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            filter={filter}
            setFilter={setFilter}
        />
        )}
      </div>

      <ErrorNotification
        messages={errorMessages}
        hidden={isHidden}
        onClose={() => setIsHidden(true)}
      />
    </div>
  );
};
