import alert from './alert.js';

export default class Modal{
    constructor(){
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.btn = document.getElementById('modal-btn');
        this.date = document.getElementById('modal-date');
        this.completed = document.getElementById('modal-completed');
        this.alert = new alert('modal-alert');

        this.todo = null;
    }

    setValues(todo){
        this.todo = todo;
        this.title.value = todo.title;
        this.description.value = todo.description;
        this.date.value = todo.date;
        this.completed.checked = todo.completed;
    }

    onClick(callback){
        this.btn.onclick = () => {
            // validate inputs
            if(!this.title.value || !this.description.value || !this.date.value){
                this.alert.show('Título, descripción y fecha son obligatorios');
                return;
            }
            $('#modal').modal('toggle');
            
            callback(this.todo.id, {
                title: this.title.value,
                description: this.description.value,
                date: this.date.value,
                completed: this.completed.checked
            });
        }
    }
}