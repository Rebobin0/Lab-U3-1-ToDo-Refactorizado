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
        
        //set arrow function so that 'this' refers to the View instance
        this.addTodoComponent.onClick((title, description,date) => this.addTodo(title, description,date));
        this.modal.onClick((id, values) => this.editTodo(id, values));
        this.filters.onClick((filters) => this.filter(filters));
    }

    setModel(model) {
        this.model = model;
    }

    render(){
        // get todos from model and create rows
        const todos = this.model.getTodos();
        todos.forEach((todo) => this.createRow(todo));
    }

    filter(filters){
        const {type, words} = filters;
        //destructure filters object, get type and words

        //get all rows except header row
        //[,...rows] keeps returning the header row for some reason
        //const [,...rows] = this.table.getElementsByTagName('tr');
        //querySelectorAll returns a static NodeList, getElementsByTagName a live HTMLCollection
        const rows = this.table.querySelectorAll('tr:not(:first-child)');
        
        for(const row of rows){
            const [title, description, date, completed] = row.children;
            let shouldHide = false;

            //filter by words
            if(words){
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }

            const shouldBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked;

            //filter by type
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

    addTodo(title, description, date){
        // call model to add todo and create row in view
        const todo = this.model.addTodo(title, description, date);
        this.createRow(todo);
    }

    toggleCompleted(id) {
        // call model to toggle completed
        this.model.toggleCompleted(id);
    }

    editTodo(id, values){
        this.model.editTodo(id, values);
        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].innerText = values.date;
        row.children[3].children[0].checked = values.completed;     
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
            <td>${todo.date}</td>
            <td class="text-center"></td>
            <td class="text-right"></td>
        `;

        // add checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[3].appendChild(checkbox);
        
        // add edit button
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn','btn-primary','mb-1');
        editBtn.innerHTML='<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle','modal');
        editBtn.setAttribute('data-target','#modal');
        //we cant just pass todo bc its values can change, so we get them from the row
        editBtn.onclick = () => this.modal.setValues({
            id: todo.id,
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
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[4].appendChild(removeBtn);
    }
}