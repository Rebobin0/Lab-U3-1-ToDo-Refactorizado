export default class Model {
    constructor() {
        this.view = null;
        this.todos = [];
        this.currentId = 1;
    }

    setView(view) {
        this.view = view;
    }

    getTodos() {
        return this.todos;
    }

    findTodo(id) {
        // find index of todo by id
        return this.todos.findIndex((todo) => todo.id === id);
    }

    toggleCompleted(id) {
        // invert completed status
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        console.log(this.todos);
    }

    addTodo(title, description) {
        const todo = { 
            id:this.currentId++,
            title,
            description,
            completed: false 
        };

        this.todos.push(todo);
        console.log(this.todos);

        //return a clon of the todo to avoid direct manipulation
        return { ...todo };
    }
    // remove from Array todos
    removeTodo(id) {
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        console.log(this.todos);
    }
}