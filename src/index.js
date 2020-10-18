import './styles.css';
import { Todo, TodoList } from './classes';
import { CrearTareainHTML } from './components/componete';
export const listaTareas = new TodoList();
if (listaTareas.todos.length > 0)
    listaTareas.todos.forEach(todo => CrearTareainHTML(todo));