export default class Model {
    constructor() {
        this.view = null;
        this.todos = [];
        this.apiUrl = 'http://localhost:3001/api/todos';
    }

    setView(view) {
        this.view = view;
    }

    async getTodos() {
        const res = await fetch(this.apiUrl);
        this.todos = await res.json();
        return this.todos.map(todo => ({ ...todo }));
    }

    async addTodo(title, description) {
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        const todo = await res.json();
        this.todos.push(todo);
        return { ...todo };
    }

    findTodo(id) {
        return this.todos.findIndex((todo) => todo._id === id);
    }

    async toggleCompleted(id) {
        const index = this.findTodo(id);
        const todo = this.todos[index];
        const updated = { ...todo, completed: !todo.completed };
        const res = await fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        });
        this.todos[index] = await res.json();
    }

    async editTodo(id, values) {
        const index = this.findTodo(id);
        const updated = { ...this.todos[index], ...values };
        const res = await fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        });
        this.todos[index] = await res.json();
    }

    async removeTodo(id) {
        await fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' });
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
    }
}