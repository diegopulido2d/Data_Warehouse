

function removeChannel(e) {
    e.preventDefault();
    // console.log('remove, ' + e.target.parentNode.parentNode.id);
    e.currentTarget.parentNode.parentNode.remove();
}

function editChannel(e) {
    e.preventDefault();
    const channel_id = e.currentTarget.parentNode.parentNode.id;
    // console.log(e.currentTarget);

   if (['BUTTON'].includes(e.currentTarget.tagName)){

       //for all items child of channel_id toggle disabled
    const items = document.querySelectorAll(`#${channel_id} .channel__item`);
    for (let i = 0; i < items.length; i++) {
        items[i].disabled = items[i].disabled ? false : true;
    }
    if (e.currentTarget.innerHTML.search('Editar') > -1) {
        e.currentTarget.innerHTML = '<i class="fas fa-pen"></i> Salvar Cambios';
        e.currentTarget.setAttribute('edit_mode', true);
    } else {
        e.currentTarget.innerHTML = '<i class="fas fa-pen"></i> Editar Canal';
        e.currentTarget.setAttribute('edit_mode', false);
    }

   }


}


function createSelector(values) {
    const parent_container = document.createElement('div');
    parent_container.classList.add('col-2');
    parent_container.classList.add('mb-3');
    parent_container.classList.add('ps-1');
    parent_container.classList.add('pe-1');
  
    const select = document.createElement("select");
    select.classList.add('channel__item');
    select.classList.add('form-select');
    select.disabled = true;
    for (const val of values)
    {
        var option = document.createElement("option");
        option.value = values.indexOf(val) + 1;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }

    parent_container.appendChild(select);
    return parent_container;

}

function createInput(value) {
    const parent_container = document.createElement('div');
    parent_container.classList.add('col-2');
    parent_container.classList.add('mb-3');
    parent_container.classList.add('ps-1');
    parent_container.classList.add('pe-1');
    const input = document.createElement('input');
    input.classList.add('channel__item');
    input.classList.add('form-control');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Channel name');
    //set id
    // input.setAttribute('id', _id);
    //set value for input
    input.setAttribute('value', value);
    input.disabled = true;
    parent_container.appendChild(input);
    return parent_container;
}

function createButtonEraser () {
    const parent_container = document.createElement('div');
    parent_container.classList.add('col-2');
    parent_container.classList.add('mb-3');
    parent_container.classList.add('ps-1');
    parent_container.classList.add('pe-1');
    // parent_container.classList.add('d-flex');
    // parent_container.classList.add('align-items-end');

    const button = document.createElement('button');
    // button.classList.add('channel__item');
    button.classList.add('btn');
    button.classList.add('btn-outline-secondary');
    button.classList.add('btn-eraser');
    button.classList.add('w-100');

    button.innerHTML = '<i class="fa fa-trash"></i> Eliminar Canal';
    button.setAttribute('type', 'button');
    button.onclick = removeChannel;
    parent_container.appendChild(button);
    return parent_container;
}


function createButtonEdit() {
    const parent_container = document.createElement('div');
    parent_container.classList.add('col-2');
    parent_container.classList.add('mb-3');
    parent_container.classList.add('ps-1');
    parent_container.classList.add('pe-1');
    // parent_container.classList.add('d-flex');
    // parent_container.classList.add('align-items-end');
    

    const btnEdit = document.createElement('button');
    // btnEdit.classList.add('channel__item');
    btnEdit.classList.add('btn');
    btnEdit.classList.add('btn-outline-secondary');
    btnEdit.classList.add('btn-edit');
    btnEdit.classList.add('w-100');
    btnEdit.innerHTML = '<i class="fas fa-pen"></i> Editar Canal';
    //add type button
    btnEdit.setAttribute('type', 'button');

    btnEdit.onclick = editChannel;
    parent_container.appendChild(btnEdit);
    return parent_container;
}

//mark a option select as seleted
function markSelected(element,value) {
    // console.log(element, value);
    const options = element.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === value) {
            // console.log(options[i]);
            options[i].selected = true;
        }
    }
}
    

function createNewChannelItem(channel_id, canal=['1'],
 usuario, preferencias=['Sin preferencia'],
 canal_selected='1',preferencias_selected='1') {
    const container = document.createElement('div');
    container.classList.add('row');
    // container.classList.add('channel__item');
    //add id to container element
    container.setAttribute('id', channel_id);
    //create input
    const selectContacto = createSelector(canal);
    //create input
    const inputUsuario = createInput(usuario);
    //create input selector
    const selectPreferencias = createSelector(preferencias);
    //create button edit
    const btnEdit = createButtonEdit();
    //create eraser button
    const btnEraser = createButtonEraser();


    markSelected(selectContacto.querySelector('select'), canal_selected);
    markSelected(selectPreferencias.querySelector('select') , preferencias_selected);

    container.appendChild(selectContacto);
    container.appendChild(inputUsuario);
    container.appendChild(selectPreferencias);
    container.appendChild(btnEdit);
    container.appendChild(btnEraser);

    return container;
}	

function disableOptions() {
    markSelected(document.querySelector('#contact__select_canal'), '');
    document.querySelector('#contact__input_usuario').value = '';
    document.querySelector('#contact__input_usuario').disabled = true;
    document.querySelector('#contact__select_preferencia').disabled = true;
    document.querySelector('#contact__newchannel_btn').disabled = true;
}

