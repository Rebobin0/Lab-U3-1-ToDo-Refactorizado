export default class AddTodo{
    constructor() {
        this.addButton = document.getElementById("add");
        this.title = document.getElementById("title");
        this.description = document.getElementById("description");
        this.alert = document.getElementById('alert');
    }

    onClick(callback) {
        this.addButton.onclick = () => {
            // validate inputs
            if(title.value === '' || this.description.value === '' ){
                this.alert.classList.remove('d-none');
                this.alert.innerText = 'Título y descripción son obligatorios.';
                return;
            }else{
                this.alert.classList.add('d-none');
                callback(this.title.value, this.description.value);
                // clear input fields
                this.title.value = '';
                this.description.value = '';
            }
        }
    }
}