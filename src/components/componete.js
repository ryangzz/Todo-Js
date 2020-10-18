import { Todo } from '../classes';
import { listaTareas } from '../index'
const todoList = document.querySelector(".todo-list");
const txtinput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const numPendientes = document.querySelector(".todo-count").children;
export const CrearTareainHTML = (tarea) => {
    const htmlTarea = /* html */ `
    <li class="${(tarea.completado) ? "completed" : "pendiente"}" data-id="${tarea.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${(tarea.completado) ? "checked" : ""}>
        <label>${tarea.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>
    `;
    const div = document.createElement('div');
    div.innerHTML = htmlTarea;
    todoList.append(div.firstElementChild);
    numPendientes[0].textContent = `${document.querySelectorAll(".pendiente").length}`;
    return div;
}

txtinput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
        const nuevoElemento = new Todo(e.target.value);
        listaTareas.nuevoElem(nuevoElemento);
        CrearTareainHTML(nuevoElemento);
        txtinput.value = "";
        numPendientes[0].textContent = `${document.querySelectorAll(".pendiente").length}`;
    }
});

todoList.addEventListener('click', (e) => {
    const nombreElemento = e.target.localName;
    const todoElemento = e.target.parentElement.parentElement;
    if (nombreElemento.includes('input')) {
        listaTareas.completarElem(todoElemento.dataset.id);
        if (e.target.checked) {
            todoElemento.classList.toggle('completed');
            todoElemento.classList.remove('pendiente');
        } else {
            todoElemento.classList.toggle('pendiente');
            todoElemento.classList.remove('completed');
        }
    } else if (nombreElemento.includes('button')) {
        listaTareas.delElem(todoElemento.dataset.id);
        todoList.removeChild(todoElemento);
    }
    numPendientes[0].textContent = `${document.querySelectorAll(".pendiente").length}`;
});

btnBorrar.addEventListener('click', () => {
    listaTareas.delCompletados();
    for (let index = todoList.children.length - 1; index >= 0; index--) {
        const element = todoList.children[index];
        if (element.classList.contains("completed"))
            todoList.removeChild(element);
    }
    numPendientes[0].textContent = `${document.querySelectorAll(".pendiente").length}`;
});

ulFiltros.addEventListener('click', (eve) => {
    const filtro = eve.target.text;
    if (!filtro) return;
    const selecionado = document.querySelector('.selected');
    selecionado.classList.remove("selected");
    eve.target.classList.add("selected");
    for (const elem of todoList.children) {
        elem.classList.remove('hidden');
        const completado = elem.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completado)
                    elem.classList.add('hidden');
                break;
            case 'Completados':
                if (!completado)
                    elem.classList.add('hidden');
                break;
        }
    }
})