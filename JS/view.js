import AddTodo from "./components/add-todo.js";
import Modal from "./components/modal.js";
import Filter from "./components/filters.js";

export default class View{
    constructor() { 
        this.model = null;
        this.table = document.getElementById("table");
        this.addTodoComponent = new AddTodo();
        this.modal = new Modal();
        this.filters = new Filter();
        
        this.addTodoComponent.onClick((title, description, date) => this.addTodo(title, description, date));
        this.modal.onClick((id, values) => this.editTodo(id, values));
        this.filters.onClick((filters) => this.filter(filters));
    }

    setModel(model) {
        this.model = model;
    }

    async render(){
        // Limpia las filas existentes
        while (this.table.rows.length > 1) {
            this.table.deleteRow(1);
        }
        const todos = await this.model.getTodos();
        todos.forEach((todo) => this.createRow(todo));
    }

    filter(filters){
        const {type, words} = filters;
        const rows = this.table.querySelectorAll('tr:not(:first-child)');
        for(const row of rows){
            const [title, description, date, completed] = row.children;
            let shouldHide = false;
            if(words){
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }
            const shouldBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked;
            if(type !== 'all' && shouldBeCompleted !== isCompleted){
                shouldHide = true;
            }
            if(shouldHide){
                row.classList.add('d-none');
            }else{
                row.classList.remove('d-none');
            }
        }
    }

    async addTodo(title, description, date){
        const todo = await this.model.addTodo(title, description, date);
        this.createRow(todo);
    }

    async toggleCompleted(id) {
        await this.model.toggleCompleted(id);
    }

    async editTodo(id, values){
        await this.model.editTodo(id, values);
        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].innerText = values.date;
        row.children[3].children[0].checked = values.completed;     
    }

    async removeTodo(id) {
        await this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    createRow(todo){
        const row = this.table.insertRow();
        row.setAttribute('id', todo._id);
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td>${todo.date}</td>
            <td class="text-center"></td>
            <td class="text-right"></td>
        `;

        // add checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo._id);
        row.children[3].appendChild(checkbox);
        
        // add edit button
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn','btn-primary','mb-1');
        editBtn.innerHTML='<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle','modal');
        editBtn.setAttribute('data-target','#modal');
        editBtn.onclick = () => this.modal.setValues({
            id: todo._id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            date: row.children[2].innerText,
            completed: row.children[3].children[0].checked
        });
        row.children[4].appendChild(editBtn);
        
        // add remove button
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn','btn-danger','mb-1','ml-1');
        removeBtn.innerHTML='<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo._id);
        row.children[4].appendChild(removeBtn);
    }
}