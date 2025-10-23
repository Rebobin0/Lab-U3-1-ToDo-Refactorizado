 export default class View{
    constructor() {
        this.model = null;
        this.table = document.getElementById("table");
        const addButton = document.getElementById("add");
        //set arrow function so that 'this' refers to the View instance
        addButton.onclick = () => {
            this.addTodo('Title', 'Description');
        }
    }

    setModel(model) {
        this.model = model;
    }

    addTodo(title,description){
        this.model.addTodo(title,description);
    }
}
//