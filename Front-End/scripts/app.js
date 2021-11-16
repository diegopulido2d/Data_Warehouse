import UI from './UI.js';
import Functions from './functions.js';

const ui = new UI();
const functions = new Functions();

const _btnLogin = document.getElementById('btn-login');
const _longAlert = document.getElementById('login-alert-container');
const usersTab = document.getElementById('pills-usuarios-tab');
const regionsTab = document.getElementById('pills-regiones-tab');
const companiesTab = document.getElementById('pills-compania-tab');
const contactosTab = document.getElementById('pills-contactos-tab');
const $userModal = document.getElementById('userModal');
const $companyModal = document.getElementById('companyModal');
const $contactModal = document.getElementById('contactsModal');
const $userName = document.getElementById('user_name');

// region/pais
const $btn_addRegion = document.querySelector('#btn_addRegion'); 
const $btn_addCountry = document.querySelector('#btn_addCountry'); 
const $btn_addCity = document.querySelector('#btn_addCity'); 

//compania
const $selectRegion = document.querySelector('#company_region');
const $selectCountry= document.querySelector('#company_country');
const $companyPhone = document.querySelector('#company_phone');

//salir
const $btnSalir = document.getElementById('pills-gohome-tab');

//tabla contacts
const $table_contacts = $('#table-contacts');
const $remove = $("#remove");
const $seleccionados = $("#seleccionados"); 
//formulario contacts
const $newchannel_container = document.querySelector('#contact__newchannel_container');
const $newchannel_btn = document.querySelector('#contact__newchannel_btn');
const $select_canal = document.querySelector('#contact__select_canal');
const $select_preferencia = document.querySelector('#contact__select_preferencia')
const $select_slider = document.querySelector('#contact__select_slider');
const $input_usuario = document.querySelector('#contact__input_usuario');
const $select_contact_region = document.querySelector('#contact__select_region');
const $select_contact_pais = document.querySelector('#contact__select_pais');
const $contact_name = document.querySelector('#contact_name');



let newchannel_count = 1;
let userId = null;
let companyId = null;
let contactId = null;

// my code
const handlerEventDelUser = (owner)=> {
    const _id = owner.getAttribute('data-_id');
    // console.log(_id);
    Swal.fire({
        title: 'Advertencia',
        text: "Esta operación no se puede revertir. ¿Desea continuar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar'
      }).then((result) => {
        if (result.isConfirmed) {
           const deleteUser = ui.deleteUser(_id);
           
           deleteUser.then((result) => {
            //    console.log(result)
            if (result) {
              Swal.fire(
                'Eliminado',
                'El usuario ha sido eliminado.',
                'success'
              )

              ui.renderUsersTable();

            }else{
              Swal.fire(
                  'Error',
                  'El usuario no se puede eliminar.',
                  'error'
              )
            }

           })
        }
      })
    // ui.renderMessage('Cargado Correctamente');
}

// it is default behaviour
const handlerEventCreateUser =  (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newUser = functions.getUserData();
    if (newUser) {
        ui.sendUser(newUser);
        ui.renderUsersTable();
    }

};
const handlerEventUpdateUser = (e)=> {
    e.preventDefault();
    e.stopPropagation();

    ui.editUser(userId);
};

const handlerEventCreateContact =  (e) => {
    e.preventDefault();
    e.stopPropagation();

    // console.log('create contact')

    const newContact = functions.getContactData();
    // console.log(newContact);
    if (newContact) {
        ui.sendContact(newContact);
        ui.renderContacts();
    }
    
}

const handlerEventUpdateContact = (e)=> {

  e.preventDefault();
  e.stopPropagation();
  // console.log('ui.editContact(contactId);')

  let botones = document.querySelectorAll('#contactsModal button');
  let botones_activos=0
  botones.forEach(ele => {
    ele.getAttribute('edit_mode')=='true'?botones_activos++:false;
  });
  if(botones_activos>0){
    console.log('botones activos')
    Swal.fire('Conflicto','No se puede editar un contacto mientras se esta editando uno de sus canales','warning');
    return false;
  }else{
    ui.editContact(contactId);
  }

  
};


const handlerEventCreateCompany =  (e) => {
  e.preventDefault();
  e.stopPropagation();

  const newCompany = functions.getCompanyData();
  if (newCompany) {
      ui.sendCompany(newCompany);
      ui.renderCompaniesTable();
  }
  
};
const handlerEventUpdateCompany = (e)=> {
  e.preventDefault();
  e.stopPropagation();

  ui.editCompany(companyId);
};

const handlerEventDelCompany = (owner)=> {
  const _id = owner.getAttribute('data-_id');
  // console.log(_id);


  Swal.fire({
    title: 'Advertencia',
    text: "Esta operación no se puede revertir. ¿Desea continuar?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Continuar'
  }).then((result) => {
    if (result.isConfirmed) {
      const deleteCompany = ui.deleteCompany(_id);
      // console.log('Confirmacion de borrado')
       
      deleteCompany.then((result) => {
        // console.log(result)
        if (result) {
          Swal.fire(
            'Eliminado',
            'La compañia ha sido eliminada.',
            'success'
          )
        }else{
          Swal.fire(
              'Error',
              'La compañia no se puede eliminar.',
              'error'
          )
        }
      })
    }
  })



};

const handlerEventUpdateRegion = (obj)=>{

    // console.log('Update Region', obj);
    switch (obj.Type){
      case "region":
        // console.log(that)
        ui.editRegion(obj.bdId);
        break;
      case "country":
        ui.editCountry(obj.bdId);
        break;
      case "city":
        ui.editCity(obj.bdId);
        break;
    } 
}

const handlerEventDeleteRegion = (obj)=> {

  // console.log('delete',obj);
  Swal.fire({
  title: 'Advertencia',
  text: "Esta operación no se puede revertir. ¿Desea continuar?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Continuar'
  }).then((result) => {
    if (result.isConfirmed) {
      switch (obj.Type){
        case "region":
          // console.log(that)
          ui.deleteRegion(obj.bdId);
          break;
        case "country":
          ui.deleteCountry(obj.bdId);
          break;
        case "city":
          ui.deleteCity(obj.bdId);
          break;
      }    
    }
  })
}


//run on page load
window.onload = () => {
    window.deleteUser = handlerEventDelUser;
    window.deleteCompany = handlerEventDelCompany;

    window.callbackUpdate = handlerEventUpdateRegion;
    window.callbackDelete = handlerEventDeleteRegion;

    // accions edit and remove table contacts
    window.operateEvents = {
      // "click .edit": function (e, value, row, index) {
      
      //   console.log("You click like action, row: " + JSON.stringify(row));
        
      // },
      "click .remove": function (e, value, row, index) {
          
        // console.log(e.currentTarget);

        $table_contacts.bootstrapTable('uncheck',  index);
          
          Swal.fire({
            title: 'Advertencia',
            html: "Esta operación no se puede revertir. ¿Desea continuar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar'
          }).then((result) => {
            if (result.isConfirmed) {
              ui.deleteContact(row.id);
              $table_contacts.bootstrapTable('uncheckAll');
              $seleccionados.addClass("d-none"); 
              $remove.css("opacity", "0");
            }else{
              $table_contacts.bootstrapTable('check',  index);
            }
          })
      },
    };

    window.deleteContacts = (props)=> {
      // console.log("You click like action, row",props)
      props.forEach(element => {
        // console.log(element)
        ui.deleteContact(element);
      });
    }


    // login
    ui.init();
    // $("#userModal").modal({show: true});
}

const handleFormSubmit = (e)=> {
    e.preventDefault();
    e.stopPropagation();

    // console.log("login");

    const _username = document.getElementById("username").value;
    const _password = document.getElementById("password").value;
    const _data = {
      username: _username,
      password: _password,
    };
    // if username and password are valid
    if (_username && _password) {
        ui.userLogin(_data);
    }
    else {
        ui.renderMessage("Datos requeridos.", "danger", _longAlert);
    }
}


// LOGIN//PRINCIPAL
_btnLogin.addEventListener('click', handleFormSubmit);


//USUARIOS
usersTab.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    ui.renderUsersTable();

});
// USER MODAL
$userModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  const button = event.relatedTarget
  const modalTitle = $userModal.querySelector('.modal-title')
  const btn_addUser = $userModal.querySelector('#btn_addUser')
  
  
  // Extract info from data-bs-* attributes
  const Params = button.getAttribute('data-bs-whatever')
  
  const _function = Params.split('_')[0].split(':')[1]
  const _id = Params.split('_')[1].split(':')[1]

  userId = _id;

  if (_function =='edit'){   

      ui.renderEditUserModal(_id);
      modalTitle.textContent = 'Modo Edicion: ' + _id
      document.querySelector("#btn_addUser > span").innerText= 'Actualizar';

      btn_addUser.removeEventListener('click', handlerEventCreateUser);
      // mantiene siempre un solo evento
      btn_addUser.removeEventListener('click', handlerEventUpdateUser);
      btn_addUser.addEventListener('click', handlerEventUpdateUser);     
  }

  if (_function =='create'){
      document.querySelector("#User_Form").reset();
      ui.renderCreationUserModal();
      modalTitle.textContent = 'Nuevo Usuario: '
      document.querySelector("#btn_addUser > span").innerText= 'Crear';

      btn_addUser.removeEventListener('click', handlerEventUpdateUser);
      // mantiene siempre un solo evento
      btn_addUser.removeEventListener('click', handlerEventCreateUser);
      btn_addUser.addEventListener('click', handlerEventCreateUser);     
  }

});


//TAB REGIONES
regionsTab.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    ui.renderTreeviewRegions();
});

$btn_addRegion.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  Swal.fire({
    title: 'Agregar',
    input: 'text',
    // inputLabel: 'Nueva Region',
    inputPlaceholder: 'nombre',
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (!value == '') {
          resolve()
        } else {
          resolve('Nombre de region no valido')
        }
      })
    }
  }).then((result) => {
    // console.log(result);
    if (result.isConfirmed) {
      ui.sendRegion({name:result.value});
    }
  })
})

$btn_addCountry.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();


  ui.renderRegions()
  .then((regiones) => {
    // console.log(regiones)
    const inputOptions = new Map();
    regiones.forEach((element) => {inputOptions.set(element.id, element.name);})
    // console.log(inputOptions);
    Swal.fire({
      title: 'Seleccione una región:',
      input: 'select',
      inputOptions: inputOptions,
      inputPlaceholder: 'Region',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value == '') {
            resolve()
          } else {
            resolve('Debe seleccionar una region.')
          }
        })
      }
    }).then((result) => {
      // console.log(result)
      if (result.isConfirmed) {
        const regionId = result.value;
        // console.log(regionId)
        Swal.fire({
          title: 'Agregar nuevo pais:',
          input: 'text',
          inputPlaceholder: 'nombre',
          showCancelButton: true,
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (!value == '') {
                resolve()
              } else {
                resolve('Nombre de pais no válido.')
              }
            })
          }
        }).then((result) => {
          // console.log(result);
          if (result.isConfirmed) {
            //console.log(regionId, {name:result.value})
            ui.sendCountry(regionId, {name:result.value});
          }
        })
      }

    })
  });
 
})

$btn_addCity.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  ui.renderRegions()
  .then((regiones) => {
    const inputOptions = new Map();
    regiones.forEach((element) => {inputOptions.set(element.id, element.name);})
    Swal.fire({
      title: 'Seleccione una región:',
      input: 'select',
      inputOptions: inputOptions,
      inputPlaceholder: 'Región',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value == '') {
            resolve()
          } else {
            resolve('Debe seleccionar una region.')
          }
        })
      }
    }).then((result) => {
      // console.log(result)
      if (result.isConfirmed) {
        const regionId = result.value;
        ui.renderCountries(regionId)
        .then((paises) => {
          // console.log(paises)
          if (!paises) {
            Swal.fire(
              'Error',
              'Agregue primero un pais.',
              'error'
            )
            return;
          }
          const inputOptions = new Map();
          paises.forEach((element) => {inputOptions.set(element.id, element.name);})
          // console.log(inputOptions)
          Swal.fire({
            title: 'Seleccione un pais:',
            input: 'select',
            inputOptions: inputOptions,
            inputPlaceholder: 'País',
            showCancelButton: true,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                if (!value == '') {
                  resolve()
                } else {
                  resolve('Debe seleccionar un pais.')
                }
              })
            }
          }).then((result) => {
            // console.log(result)
            if (result.isConfirmed) {
              const countryId = result.value;
              Swal.fire({
                title: 'Agregar nueva ciudad:',
                input: 'text',
                inputPlaceholder: 'Ciudad',
                showCancelButton: true,
                inputValidator: (value) => {
                  return new Promise((resolve) => {
                    if (!value == '') {
                      resolve()
                    } else {
                      resolve('Nombre de ciudad no válido.')
                    }
                  })
                }
              }).then((result) => {
                // console.log(result);
                if (result.isConfirmed) {
                  //console.log(regionId, {name:result.value})
                  ui.sendCity(countryId, {name:result.value});
                }
              })

            }
          })
        });

      }
    })
  });

});


//COMPAÑIAS
companiesTab.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    ui.renderCompaniesTable();
});



$companyModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  const button = event.relatedTarget; 
  const modalTitle  = $companyModal.querySelector('.modal-title')
  const btn_addCompany = $companyModal.querySelector('#btn_addCompany')
  
   
  // Extract info from data-bs-* attributes
  const Params = button.getAttribute('data-bs-whatever')// Extract info from data-* attributes

  const _function = Params.split('_')[0].split(':')[1]
  const _id = Params.split('_')[1].split(':')[1]

  companyId = _id;

  if (_function =='update'){
    document.querySelector("#Company_Form").reset();
    ui.renderUpdateCompanyModal(_id);
    modalTitle.textContent = 'Modo Edicion: ' + _id
    document.querySelector("#btn_addCompany > span").innerText= 'Actualizar';

    btn_addCompany.removeEventListener('click', handlerEventCreateCompany);
    // mantiene siempre un solo evento
    btn_addCompany.removeEventListener('click', handlerEventUpdateCompany);
    btn_addCompany.addEventListener('click', handlerEventUpdateCompany); 
  }
  if (_function =='create'){
    document.querySelector("#Company_Form").reset();
    ui.renderCreateCompanyModal();
    modalTitle.textContent = 'Nueva Compañia: '    
    document.querySelector("#btn_addCompany > span").innerText= 'Crear';

    btn_addCompany.removeEventListener('click', handlerEventUpdateCompany);
    // mantiene siempre un solo evento
    btn_addCompany.removeEventListener('click', handlerEventCreateCompany);
    btn_addCompany.addEventListener('click', handlerEventCreateCompany);  

  }

})



//company listener

$selectRegion.addEventListener('change', async(event) => {
  const regionId = event.target.value;
  let data = await ui.renderCountries(regionId);
  // console.log(data);
  const countries = data.filter((country) => {return country.isactive});
  functions.fillSelector('#company_country', -1,countries);
  const countryId = countries[0].id;
  // console.log(countryId);
  data = await ui.renderCities(countryId);
  // console.log(data);
  const cities = data.filter((city) => {return city.isactive});
  functions.fillSelector('#company_city', -1,cities);

});  

$selectCountry.addEventListener('change', async(event) => {
  const countryId = event.target.value;
  let data = await ui.renderCities(countryId);
  // console.log(data);
  const cities = data.filter((city) => {return city.isactive});
  functions.fillSelector('#company_city', -1,cities);
});  

$companyPhone.addEventListener('keydown', (event) => {
  // console.log(event.target.value);
  var keycode = event.which;
  if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
      event.preventDefault();
  }
});

$userName.addEventListener("keydown", (event) => {
  // console.log(event);
  var charCode = event.keyCode;

  if (!((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)) {
    event.preventDefault();
  }

});





$btnSalir.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  ui.userLogout();

});

//CONTACTOS_TAB
contactosTab.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  ui.renderContacts();
});


//contactos
$newchannel_btn.addEventListener('click', function() {
  const canales =[
      'WhatsApp',
      'Facebook',
      'Instagram',
      'E-mail',
      'Teléfono',
      'Linkedin',
      'Twitter'
      ]
  const preferencias = [
      'Sin preferencia', 
      'Canal favorito', 
      'No molestar'];
  const usuario = $input_usuario.value;
  const canal_selected = $select_canal.value;
  const preferencias_selected = $select_preferencia.value;

  const newChannel = createNewChannelItem(`channel__items_${newchannel_count}`, 
  canales, usuario, preferencias, canal_selected, preferencias_selected);
  $newchannel_container.appendChild(newChannel);
  newchannel_count++;


  disableOptions();

});

//onchange addEventListener
$select_canal.addEventListener('change', function(e) {
      const value = e.target.value;
      // console.log(value);
      if(value !== ''){
          document.getElementById('contact__input_usuario').disabled = false;
      }else{
          document.getElementById('contact__input_usuario').disabled = true;
      }
  }
);

$input_usuario.addEventListener('keyup', function(e) {
      const value = e.target.value;
      // const el = e.target.closest('span');
      // console.log(e);
      // console.log(value);
      if(value.length > 4){
          e.target.parentElement.querySelector('span').classList.add('d-none');
          document.getElementById('contact__newchannel_btn').disabled = false;
          $select_preferencia.disabled = false;
      }else{
          e.target.parentElement.querySelector('span').classList.remove('d-none');
          document.getElementById('contact__newchannel_btn').disabled = true;
          $select_preferencia.disabled = true;
      }
  }
);

$select_slider.addEventListener('change', function(e) {
      const value = e.target.value;
      // console.log(value);
      // interes_slider.setValues(`${value}%`)
      const slider = document.querySelector('.progress-bar');
      slider.style.width = `${value}%`;
      switch (value) {
          case '0': slider.style.backgroundColor  = '#DDDDDD';
          break;
          case '25': slider.style.backgroundColor  = '#1CC1F5';
          break;
          case '50': slider.style.backgroundColor  = '#FFC700';
          break;
          case '75': slider.style.backgroundColor  = '#FF6F00';
          break;
          case '100': slider.style.backgroundColor  = '#DE0028';
          break;
          default: slider.style.backgroundColor  = '#DDDDDD';
          break;

      }
  }   
);

// CONTACTOS MODAL
$contactModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  const button = event.relatedTarget; 
  const modalTitle  = $contactModal.querySelector('.modal-title')
  const btn_addContacto = $contactModal.querySelector('#btn_addContacto');

  // Extract info from data-bs-* attributes
  const Params = button.getAttribute('data-bs-whatever')// Extract info from data-* attributes

  const _function = Params.split('_')[0].split(':')[1]
  const _id = Params.split('_')[1].split(':')[1]

  contactId = _id;

  if(_function === 'update'){
    functions.resetContactForm();
    ui.renderUpdateContactModal(_id);
    modalTitle.textContent = 'Modo Edicion: ' + _id
    document.querySelector("#btn_addContacto > span").innerText= 'Actualizar';

    btn_addContacto.removeEventListener('click', handlerEventCreateContact);
    // mantiene siempre un solo evento
    btn_addContacto.removeEventListener('click', handlerEventUpdateContact);
    btn_addContacto.addEventListener('click', handlerEventUpdateContact); 
  
  }

  if (_function =='create'){
    // document.querySelector("#contacto_form").reset();
    functions.resetContactForm();
    ui.renderCreateContactModal();
    modalTitle.textContent = 'Nuevo Contacto: '    
    document.querySelector("#btn_addContacto > span").innerText= 'Crear';

    btn_addContacto.removeEventListener('click', handlerEventUpdateContact);
    // mantiene siempre un solo evento
    btn_addContacto.removeEventListener('click', handlerEventCreateContact);
    btn_addContacto.addEventListener('click', handlerEventCreateContact);  

  }

});

$contact_name.addEventListener('keyup', function(e) {
  const value = e.target.value;
  // console.log(e.target);
  if(value.length > 4){
      e.target.parentElement.querySelectorAll('span')[1].classList.add('d-none');
  }else{
      e.target.parentElement.querySelectorAll('span')[1].classList.remove('d-none');
  }
}
);



$select_contact_region.addEventListener('change', async(event) => {
  const regionId = event.target.value;
  // console.log(typeof regionId);
  if(!regionId == ''){
    let data = await ui.renderCountries(regionId);
    // console.log(data);
    const countries = data.filter((country) => {return country.isactive});
    functions.fillSelector('#contact__select_pais', -1,countries);
    const countryId = countries[0].id;
    // console.log(countryId);
    data = await ui.renderCities(countryId);
    // console.log(data);
    const cities = data.filter((city) => {return city.isactive});
    functions.fillSelector('#contact__select_ciudad', -1,cities);

    //remove disable contact address input
    document.querySelector('#contact__input_direccion').disabled = false;
    document.querySelector('#contact__select_pais').disabled = false;
    document.querySelector('#contact__select_ciudad').disabled = false;
  }else{
    document.querySelector('#contact__select_ciudad').disabled = true;
    document.querySelector('#contact__select_pais').disabled = true;
    document.querySelector('#contact__input_direccion').disabled = true;
    
  }
});

$select_contact_pais.addEventListener('change', async(event) => {
  const countryId = event.target.value;
  let data = await ui.renderCities(countryId);
  // console.log(data);
  const cities = data.filter((city) => {return city.isactive});
  functions.fillSelector('#contact__select_ciudad', -1,cities);

  //remove disable contact address input
  document.querySelector('#contact__input_direccion').disabled = false;
}); 