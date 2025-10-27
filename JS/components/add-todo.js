import Alert from "./alert.js";

export default class AddTodo{
    constructor() {
        this.addButton = document.getElementById("add");
        this.title = document.getElementById("title");
        this.description = document.getElementById("description");
        this.date = document.getElementById("date");

        this.alert = new Alert('alert');
    }
  
    onClick(callback) {
        this.addButton.onclick = () => {
            // validate inputs
            if(title.value === '' || this.description.value === '' ){
                this.alert.show('Título y descripción son obligatorios');
                return;
            }else{
                this.alert.hide();
                callback(this.title.value, this.description.value);
                // clear input fields
                this.title.value = '';
                this.description.value = '';
            }
        }
    }
}