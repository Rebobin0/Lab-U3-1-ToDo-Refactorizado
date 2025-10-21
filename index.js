document.addEventListener('DOMContentLoaded', function(){
    const title = document.getElementById('title');
    const desc = document.getElementById('description');
    const table = document.getElementById('table');
    const alert = document.getElementById('alert');
    const btn = document.getElementById('add');

    function addTodo(){
        if(title.value === '' || desc.value === '' ){
            alert.classList.remove('d-none');
            alert.innerText = 'Título y descripción son obligatorios.';
            return;
        }
        alert.classList.add('d-none');
        const row = table.insertRow();
        row.innerHTML = `
            <td>${title.value}</td>
            <td>${desc.value}</td>
            <td class="text-center">
                <input type="checkbox">
            </td>
            <td class="text-right">
                <button class="btn btn-primary mb-1">
                <i class="fa fa-pencil"></i>
                </button>
                <button class="btn btn-danger mb-1 ml-1">
                <i class="fa fa-trash"></i>
                </button>
            </td>
        `;
        title.value = '';
        desc.value = '';
    }

    btn.onclick = addTodo;
});

