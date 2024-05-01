import { useEffect, useReducer, useState } from "react";
import { todoReducer } from "../08-reducer/todoReducer";


const init = () => {
    return JSON.parse(localStorage.getItem('todos') || []);
}


const useTodo = () => {
    
    const [todos, dispatch] = useReducer(todoReducer, [], init)


    useEffect(() => {
      
        localStorage.setItem('todos', JSON.stringify(todos))
        
      
    }, [todos])
    

    const handleNewTodo = (todo) => {
        
        const action = {
            type: 'Add Todo',
            payload: todo
        }

        dispatch(action);
        
    }


    const handleDeleteTodo = (id) => {

        dispatch({
            type: 'Remove Todo',
            payload: id
        });


    }


    const handleToggleTodo = (id) => {

        dispatch({
            type: 'Toggle Todo',
            payload: id
        });

    }
    
    
    return {
        todos,
        countTodos: todos.length,
        pendingTodos: todos.filter( todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}

export default useTodo
