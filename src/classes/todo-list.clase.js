import { Todo } from "./todo.clase";

export class TodoList {

    constructor() {
        this.cargarLocalStorage();
    }

    nuevoElem(tarea) {
        this.todos.push(tarea);
        this.guardarLocalSotage();
    }

    delElem(id) {
        this.todos = this.todos.filter(elem => elem.id != id);
        this.guardarLocalSotage();
    }

    completarElem(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                break;
            }
        }
        this.guardarLocalSotage();
    }
    delCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalSotage();
    }
    guardarLocalSotage() {
        localStorage.setItem('tareas', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        this.todos = (localStorage.getItem('tareas')) ?
            JSON.parse(localStorage.getItem('tareas')) : [];
        this.todos = this.todos.map(obj => Todo.FromJson(obj));
    }

    obtenerNumElem() {
        return this.todos.length;
    }
}