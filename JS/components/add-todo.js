export default class AddTodo{
    constructor(addTodoCallback) {
        this.addButton = document.getElementById("add");
        this.title = document.getElementById("title");
        this.desc = document.getElementById("description");
    }

    onClick(callback) {
        this.addButton.onclick = () => {
            if(title.value === '' || desc.value === '' ){
                //alert.classList.remove('d-none');
                //alert.innerText = 'Título y descripción son obligatorios.';
                //return;
                console.error("Título y descripción son obligatorios.");
            }else{
                callback(this.title.value, this.description.value);
            }
        }
    }
}