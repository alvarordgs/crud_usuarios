const botaoSubmit = document.querySelector('[data-submit]');
let dataArray = JSON.parse(localStorage.getItem('usersData')) || [];

if(dataArray) {
    dataArray.forEach((data) => {
        handleCreateNewItem(data)
    })
}

const btnsEdit = document.querySelectorAll('[data-icon="edit"]');

btnsEdit.forEach((btn) => {
    btn.addEventListener('click', function(e) {
        handleEditItem(e);
    })
})

botaoSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    
    const form = document.forms[0];
    
    const nome = form.nome.value;
    const telefone = form.telefone.value;
    const cpf = form.cpf.value;
    const id = dataArray[dataArray.length - 1] ? (dataArray[dataArray.length - 1].id) + 1 : 0;

    const newItem = {
        id,
        nome,
        telefone,
        cpf
    }

    handleSaveNewItem(newItem);

    handleCreateNewItem(newItem);

    form.nome.value = "";
    form.telefone.value = "";
    form.cpf.value = "";
})

function handleSaveNewItem(item) {
    dataArray.push(item);

    localStorage.setItem('usersData', JSON.stringify(dataArray));
}

function handleCreateNewItem(item) {

    const list = document.querySelector('[data-user="list"]')

    //criar o icone de editar
    const iconEdit = document.createElement('i');
    iconEdit.innerText = 'create';
    iconEdit.classList.add('material-icons')
    iconEdit.classList.add('user-icon')
    iconEdit.classList.add('edit')
    iconEdit.dataset.icon = "edit";
    

    //criar o icone de deletar
    const iconDelete = document.createElement('i');
    iconDelete.innerText = 'cancel';
    iconDelete.classList.add('material-icons')
    iconDelete.classList.add('user-icon')
    iconDelete.classList.add('del')
    iconDelete.dataset.icon = "del";
    
    //div com os icones
    const divIcons = document.createElement('div')
    divIcons.classList.add('user-actions');

    divIcons.appendChild(iconEdit);
    divIcons.appendChild(iconDelete);

    const spanId = document.createElement('span')
    spanId.innerText = item.id;

    const inputCpf = document.createElement('input')
    inputCpf.type = "text";
    inputCpf.classList.add('inputList')
    inputCpf.dataset.input = "cpf";
    inputCpf.value = item.cpf;
    inputCpf.setAttribute('disabled', true);

    const inputTel = document.createElement('input')
    inputTel.type = "text";
    inputTel.classList.add('inputList')
    inputTel.dataset.input = "tel";
    inputTel.value = item.telefone;
    inputTel.setAttribute('disabled', true);

    const inputNome = document.createElement('input')
    inputNome.type = "text";
    inputNome.classList.add('inputList')
    inputNome.dataset.input = "nome";
    inputNome.value = item.nome;
    inputNome.setAttribute('disabled', true);

    const itemList = document.createElement('li')
    itemList.classList.add('user-item')

    itemList.appendChild(spanId)
    itemList.appendChild(inputNome)
    itemList.appendChild(inputTel)
    itemList.appendChild(inputCpf)
    itemList.appendChild(divIcons)

    list.appendChild(itemList);
}

function handleEditItem(e) {
    itemEditar = e.target.parentNode.parentNode;
    iconAtual = e.target;
    const inputs = itemEditar.querySelectorAll('.inputList');

    if(iconAtual.innerText == "create") {
        iconAtual.innerText = "save";

        inputs.forEach(input => {
            input.removeAttribute('disabled')
        });

    } else {
        e.target.innerText = "create";

        inputs.forEach(input => {
            input.setAttribute('disabled', true)
        });
    }

}


