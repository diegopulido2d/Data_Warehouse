
class Functions {

  validateEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  }
 
  renderMessage(message, type = 'primary', container = alertPlaceholder) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + 
    ' alert-dismissible" role="alert">' + message + 
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    container.append(wrapper)

    setTimeout(() => {
      container.removeChild(wrapper);
    }, 5000);
  }

  validateContact(contact) {
    const error = [];
    if (contact.username === '') {
      error.push('El campo nombre es requerido');
    }

    if (contact.email === '') {
      error.push('El campo email nombre es requerido');
    }

    if (contact.email !== '' && !this.validateEmail(contact.email)) {
      error.push('Email no válido');
    }
 

    if (contact.job_tittle === '') {
      error.push('El campo cargo es requerido');
    }
    if (contact.address === '') {
      error.push('El campo direccion es requerido');
    }
    if (contact.companies_id === '') {
      error.push('Se debe asignar una Compañia');
    }
    if (contact.companies_id == -1) {
      error.push('El campo compañia es requerido');
    }

    if (contact.cities_id == -1) {
      error.push('El campo ciudad es requerido');
    }
    if (contact.contacts_channels.length === 0) {
      error.push('Se debe proveer por lo menos un canal de contacto');
    }

    return error;

  }
  
  getContactData() {
    const channelsContainer = document.getElementById('contact__newchannel_container');
    // const _comp = document.getElementById('company-select');
    
    const _name = document.getElementById('contact_name').value;
    const _lastname = document.getElementById('contact_lastname').value;
    const _job_tittle = document.getElementById('contact_cargo').value;
    const _email = document.getElementById('contact_email').value;
    const _company = document.getElementById('contact__select_compania').value;
    // const _region = document.getElementById('contact_region').value;
    // const _country = document.getElementById('contact_country').value;
    const _city = document.getElementById('contact__select_ciudad').value;
    const _address = document.getElementById('contact__input_direccion').value;
    const _interest = document.getElementById('contact__select_slider').value;
    const _users_id = 1;
    //todo
    const _channelsData = channelsContainer.querySelectorAll('.row');
    
    const _channels = [];
    
    _channelsData.forEach (_chanrow => {
      const _select = _chanrow.querySelectorAll('select'); 
      const _input = _chanrow.querySelector('input');
        _channels.push({
          acount: _input.value,
          channels_id: Number(_select[0].value),
          preferences_id: Number(_select[1].value),
        });
    })
    
    var _contact = {
      username: _name,
      lastname: _lastname,
      email: _email,      
      job_tittle: _job_tittle,
      address: _address,
      interest: Number(_interest), 
      users_id: _users_id,
      companies_id: _company===''? -1 : Number(_company),
      cities_id: _city===''? -1 : Number(_city),
      contacts_channels: _channels
    };
    
    const error = this.validateContact(_contact);

    if (error.length > 0) {
      this.renderMessage(error.join('<br>'), 'danger', document.querySelector('#contactsModal .modal-body'));
      return false;
    }else{
      return _contact;
    }

  };

  resetContactForm(){
    document.querySelector("#contacto_form").reset();
    //clear option from select contact__select_compania
    document.getElementById('contact__select_compania').innerHTML = '<option value="">Seleccionar Nombre</option>';
    //clear option from select contact__select_ciudad
    document.getElementById('contact__select_ciudad').innerHTML = '<option value="">Seleccionar Ciudad</option>';
    //clear option from select contact__select_region
    document.getElementById('contact__select_region').innerHTML = '<option value="">Seleccionar Región</option>';
    //clear option from select contact__select_pais
    document.getElementById('contact__select_pais').innerHTML = '<option value="">Seleccionar País</option>';
    //clear option from contact__newchannel_container
    document.getElementById('contact__newchannel_container').innerHTML = '';
    //set style to progress_bar
    document.querySelector('.progress-bar').style.width = '25%';
    //set color backgorund to progress_bar
    document.querySelector('.progress-bar').style.setProperty('background-color','#1CC1F5');
    //clear contact__input_direccion
    // document.getElementById('contact__input_direccion').value = '';

  }
  
  validateCompany(company) {

    const error = [];
    if (company.name === '') {
      error.push('El campo nombre es requerido');
    }
    if (company.address === '') {
      error.push('El campo direccion es requerido');
    }
    if (company.email === '') {
      error.push('El campo email es requerido');
    }

    if (!this.validateEmail(company.email)){
      error.push('Email no válido');
    }

    if (company.phone === '') {
      error.push('El campo telefono es requerido');
    }
    if (company.cities_id === '') {
      error.push('Se debe asignar una Ciudad');
    }

    return error;

  }

  

  getCompanyData() {
    const _name = document.getElementById('company_name').value;
    const _address = document.getElementById('company_address').value;
    const _email = document.getElementById('company_email').value;
    const _phone = document.getElementById('company_phone').value;
    // const _region = document.getElementById('company_region').value;
    // const _country = document.getElementById('company_country').value;
    const _city = document.getElementById('company_city').value;
    // const _isactive = document.getElementById('company_isactive').value;
    // 
    const _company = {
      name: _name,
      address: _address,
      email: _email,
      phone: _phone,
      cities_id: Number(_city)
      // isactive: _isactive === 'true'? true : false
    }
    // console.log(_company);

    const error = this.validateCompany(_company);

    if (error.length > 0) {
      this.renderMessage(error.join('<br>'), 'danger', document.querySelector('#companyModal .modal-body'));
      return false;
    }else{
      return _company;
    }

      
  }

  validateUser(user) {
    const error = [];
    if (user.username === '') {
      error.push('Se requiere campo Usuario');
    }
    if (user.username.length < 6) {
      error.push('Usuario no puede ser menor de 6 caracteres');
    }
    if (user.username.length > 35) {
      error.push('Usuario no puede ser mayor a 35 caracteres');
    }
    if (user.lastname === '') {
      error.push('Se requiere campo apellido');
    }
    if (user.email === '') {
      error.push('Se requiere campo Email');
    }

    if (!this.validateEmail(user.email)){
      error.push('Email no valido');
    }

    if (user.password === '') {
      error.push('Se requiere campo Contraseña');
    }

    if (user.password.length < 6) {
      error.push('Contraseña no puede ser menor de 6 caracteres');
    }

    if (user.isadmin === '') {
      error.push('Se requiere Role');
    }

    return error;

  }

  clearUserData() {
    document.getElementById('last_name').value = '';
    document.getElementById('user_name').value = '';
    document.getElementById('user_email').value = '';
    document.getElementById('user_password').value = '';
    document.getElementById('confirm_password').value = '';
  }

  getUserData() {
      const _lastname = document.getElementById('last_name').value;
      const _name = document.getElementById('user_name').value;
      // const _adress = document.getElementById('u-adress').value;
      const _email = document.getElementById('user_email').value;
      const _role = document.getElementById('user_role').value;
      const _passwd = document.getElementById('user_password').value;
      const _passwdRepeat = document.getElementById('confirm_password').value;

            
      var _user = {
          username: _name,
          lastname: _lastname,
          email: _email,
          isadmin: _role === 'true'? true : false,
          password: _passwd
      };

      const error = this.validateUser(_user);

      if (_passwd !== _passwdRepeat) {
        error.push('Contraseñas no coinciden');
      }

      if (error.length > 0) {
        this.renderMessage(error.join('<br>'), 'danger', document.querySelector('#userModal .modal-body'));
        return false;

      }else {	
        return _user;
      }
      
  }

  fillSlider(value){
    // console.log(value);
    //clear selected property option
    const _options = document.querySelector('#contact__select_slider').options;
    _options.forEach(option =>  {
      option.selected = false;
    });
    markSelected(document.querySelector('#contact__select_slider'), `${value}`);
    const slider = document.querySelector('.progress-bar');
    slider.style.width = `${value}%`;
    switch (`${value}`) {
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

  fillSelector(selector, indexSeleted, data, reset=true){
    const select = document.querySelector(selector);
    if(reset){
      select.innerHTML = '';
    }
    if (data.length > 0){
      select.removeAttribute('disabled');
      data.forEach((item) => {
        const el = document.createElement('option');
        el.textContent = item.name;
        el.value = item.id;
        if (indexSeleted == item.id){
          el.setAttribute('selected', 'selected');
        } 
        select.appendChild(el);
      })
    }else{
      select.setAttribute('disabled', '');
    }
  }

  fillChannels(channels) {
    const $newchannel_container = document.querySelector('#contact__newchannel_container');
    const canales =[
      'Whatsapp',
      'Facebook',
      'Instagram',
      'Email',
      'Telefono',
      'Linkedin',
      'Twitter'
      ]
    const preferencias = [
      'Sin preferencia', 
      'Canal favorito', 
      'No molestar'];

    

    //createNewChannelItem(channel_id, canal=['1'],
    //  usuario, preferencias=['Sin preferencia'],
    //  canal_selected='1',preferencias_selected='1')
    
    channels.forEach((element, index) => {
      const canal_selected = `${canales.indexOf(element.channels.name) + 1}`;
      const peference_selected = `${preferencias.indexOf(element.preferences.name) + 1}`;

      const channel = createNewChannelItem(`channel__items_${index+1}`, canales, 
        element.acount, preferencias,canal_selected , peference_selected);
      $newchannel_container.appendChild(channel);
    });

    
  }


}

export default Functions