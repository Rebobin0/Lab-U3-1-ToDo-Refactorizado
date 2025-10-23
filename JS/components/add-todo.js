export default class AddTodo{
    constructor() {
        this.addButton = document.getElementById("add");
        this.title = document.getElementById("title");
        this.description = document.getElementById("description");
    }

    onClick(callback) {
        this.addButton.onclick = () => {
            if(title.value === '' || this.description.value === '' ){
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