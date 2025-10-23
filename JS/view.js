import AddTodo from "./components/add-todo.js";

export default class View{
    constructor() { 
        this.model = null;
        this.table = document.getElementById("table");
        this.addTodoComponent = new AddTodo();
        
        //set arrow function so that 'this' refers to the View instance
        //addButton.onclick = () => {
        //    this.addTodo('Title', 'Description');
        //}
        this.addTodoComponent.onClick((title, description) => this.addTodo(title, description));
    }

    setModel(model) {
        this.model = model;
    }

    addTodo(title,description){
        const todo=this.model.addTodo(title,description);
    }
}
//