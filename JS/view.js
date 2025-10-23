import AddTodo from "./components/add-todo.js";

export default class View{
    constructor() { 
        this.model = null;
        this.table = document.getElementById("table");
        this.addTodoComponent = new AddTodo();
        
        //set arrow function so that 'this' refers to the View instance
        this.addTodoComponent.onClick((title, description) => this.addTodo(title, description));
    }

    setModel(model) {
        this.model = model;
    }

    addTodo(title,description){
        // call model to add todo and create row in view
        const todo=this.model.addTodo(title,description);
        this.createRow(todo);
    }

    removeTodo(id) {
        // call model to remove and remove from view
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    createRow(todo){
        const row = table.insertRow();
        row.setAttribute('id',todo.id);
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">
                <input type="checkbox">
            </td>
            <td class="text-right">
                <button class="btn btn-primary mb-1">
                <i class="fa fa-pencil"></i>
                </button>
            </td>
        `;

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn','btn-danger','mb-1','ml-1');
        removeBtn.innerHTML='<i class="fa fa-trash"></i>';

        removeBtn.onclick = () => this.removeTodo(todo.id);

        row.children[3].appendChild(removeBtn);
    }
}
//