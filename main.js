const botaoSubmit = document.querySelector('[data-submit]');
let dataArray = JSON.parse(localStorage.getItem('usersData')) || [];

/*Carrega os elementos com os dados na tela*/
if(dataArray) {
    dataArray.forEach((data) => {
        handleCreateNewItem(data)
    })
}

/*Create*/
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

    saveData();
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
    inputCpf.setAttribute('name', "cpf");

    const inputTel = document.createElement('input')
    inputTel.type = "text";
    inputTel.classList.add('inputList')
    inputTel.dataset.input = "tel";
    inputTel.value = item.telefone;
    inputTel.setAttribute('disabled', true);
    inputTel.setAttribute('name', "tel");

    const inputNome = document.createElement('input')
    inputNome.type = "text";
    inputNome.classList.add('inputList')
    inputNome.dataset.input = "nome";
    inputNome.value = item.nome;
    inputNome.setAttribute('disabled', true);
    inputNome.setAttribute('name', "nome");

    const itemList = document.createElement('li')
    itemList.classList.add('user-item')
    itemList.dataset.id = item.id;

    itemList.appendChild(spanId)
    itemList.appendChild(inputNome)
    itemList.appendChild(inputTel)
    itemList.appendChild(inputCpf)
    itemList.appendChild(divIcons)

    list.appendChild(itemList);

    /*Adiciona os eventos assim que o elemento é criado*/
    const btnEdit = divIcons.querySelector('[data-icon="edit"]');
    const btnDelete = divIcons.querySelector('[data-icon="del"]');

    btnEdit.addEventListener('click', handleEditItem)

    btnDelete.addEventListener('click', handleDeleteItem)
}


/*Edit*/
function handleEditItem(e) {
    itemEditar = e.target.parentNode.parentNode;
    iconAtual = e.target;
    const inputs = itemEditar.querySelectorAll('.inputList');

    if(iconAtual.innerText == "create") {
        iconAtual.innerText = "save";

        inputs.forEach(input => input.removeAttribute('disabled'))

    } else {
        const id = +itemEditar.dataset.id;
        const nome = itemEditar.querySelector('[data-input="nome"]').value;
        const telefone = itemEditar.querySelector('[data-input="tel"]').value;
        const cpf = itemEditar.querySelector('[data-input="cpf"]').value;

        const itemEditado = {
            id,
            nome,
            telefone,
            cpf
        }

        dataArray[dataArray.findIndex( elemento => elemento.id === itemEditado.id)] = itemEditado;
        saveData();

        e.target.innerText = "create";

        inputs.forEach(input => input.setAttribute('disabled', true));
    }

}

/*Delete*/
function handleDeleteItem(e) {
    const elementoAtual = e.target.parentNode.parentNode;
    const idElementoAtual = +elementoAtual.dataset.id;

    elementoAtual.remove();

    dataArray.splice(dataArray.findIndex(elemento => elemento.id === idElementoAtual), 1);

    saveData() ;
}

/*Salva os dados no array para ser armazenado no localStorage*/
function saveData() {
    localStorage.setItem('usersData', JSON.stringify(dataArray));
}




