import LoginService from '../services/LoginService.js';
import UsersService from '../services/UsersService.js';
import ContactsService from '../services/ContactsService.js';
import CompaniesService from '../services/CompaniesService.js';

import RegionsService from '../services/RegionsService.js';
import CitiesService from '../services/CitiesService.js';
import CountriesService from '../services/CountriesService.js';
import Functions from './functions.js';
import UserTable from './userTable.js';
import CompanyTable from './companyTable.js';
import ContactTable from './contactTable.js';
import TreeView from './regionTreeView.js';
import jwt_decode from "./jwt-decode.esm.js";

const loginService = new LoginService();
const usersService = new UsersService();
const contactsService = new ContactsService();
const regionsService = new RegionsService();
const countriesService = new CountriesService();
const citiesService = new CitiesService();
const companiesService = new CompaniesService();
// 
const functions = new Functions();
const userTable = new UserTable();
const companyTable = new CompanyTable();
const contactTable = new ContactTable();
// const treeView = new TreeView();

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const $nav_pills = document.querySelector('.nav-pills');
const $appContainer = document.querySelector('.app-container');
// const $login_container = document.querySelector('.login-container');
const $loginContainer = document.getElementById('login-container');
const $loginAlertContainer = document.getElementById('login-alert-container');
const usersTab = document.getElementById("pills-usuarios-tab");
const alertModalArea = document.querySelector('#userModal .modal-body')

var myUserModal      = new bootstrap.Modal(document.getElementById('userModal'))
const myCompanyModal = new bootstrap.Modal(document.getElementById('companyModal'))
const myContactModal = new bootstrap.Modal(document.getElementById('contactsModal'))

const userForm = document.getElementById('User_Form');
const companyForm = document.getElementById('Company_Form');



let contacts = [];

class UI {//es la clase que interactua con el navegador
   
  constructor() {
    console.log('UI constructor');
    this.treeView = new TreeView();
    this.loginUserId = null;
  }
  //AUTOLOGIN
  async init() {
     
    console.log('init');
    $nav_pills.style.display = 'none';
    // $appContainer.classList.remove("d-none");

    const user = JSON.parse(sessionStorage.getItem('user'));
    const TOKEN = sessionStorage.getItem("token");

    // check if user is not undefined
    if (user !=null && TOKEN != null) {
      if (user.isadmin) { // muestra menu usuarios
        usersTab.classList.remove("d-none");
      }
      $appContainer.classList.remove('d-none');

      this.loginUserId = user.id;

    }else
    {
      // if user is undefined, redirect to login
      $loginContainer.classList.remove("d-none");
      return false;
    }

    try {
      // valida jwt on server
      const _login = await loginService.getLogin();
      // console.log('_login',_login);


      if (_login.status === 200) {
        $loginContainer.classList.add("d-none");
        $nav_pills.style.display = "inline-block";
        // $appContainer.style.display = "flex";
        document.querySelector('#pills-contactos').classList.add('show');

        if (user.isadmin) {
          usersTab.classList.remove("d-none");
        }else{
          usersTab.classList.add('d-none');
        }

        // console.log('Punto de control .init')

        this.renderContacts();

      }else{
        usersTab.classList.add("d-none");
        $loginContainer.classList.remove("d-none");
        sessionStorage.removeItem('token');
        sessionStorage.removeItem("user");

        Swal.fire(
          'Advertencia',
          'Sesión caducada.',
          'warning'
        )
      }


    } catch (e) {
      console.log(e);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem("user");
    }

  }

  //LOGIN
  async userLogin(_login) {
    const loginUser = await loginService.postLogin(_login);

    if (loginUser.status === 200) {
      let TOKEN = loginUser.data.token;
      // const API = 'http://localhost:3000';

      sessionStorage.getItem('token') || '[]';
      sessionStorage.setItem('token', TOKEN);
      // sessionStorage.setItem('API', API);
      // sessionStorage.setItem('user', JSON.stringify(loginUser.data.user));
    
      $loginContainer.classList.add('d-none');
      $nav_pills.style.display = 'inline-block';
      // $appContainer.style.display = 'flex';
      $appContainer.classList.remove('d-none');

      //users tab
      // decrypt jwt TOKEN
      const decoded = jwt_decode(TOKEN);
      // console.log(decoded);
      sessionStorage.setItem('user', JSON.stringify(decoded.credentials));


      const user = JSON.parse(sessionStorage.getItem('user'));
      // 

      if (user.isadmin) {
        usersTab.classList.remove('d-none');
      }else{
        usersTab.classList.add('d-none');
      }

      this.loginUserId = user.id;
      this.renderContacts();
      document.querySelector('#pills-contactos').classList.add('show');
    }
    if (loginUser.status === 401 || (loginUser.status === 400)) {
      functions.renderMessage(
        "Usuario y/o contraseña inválidos. Intente de nuevo.", 
        "danger", 
        $loginAlertContainer
      );
    }
  }

  //LOGOUT
  async userLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    $loginContainer.classList.remove('d-none');
    $nav_pills.style.display = 'none';
    $appContainer.classList.add('d-none');
  }

  
  //CONTACTOS
  async renderContacts() {
    const _datos = await contactsService.getContacts();
    // console.log(_datos);
    contactTable.initTable(_datos);

  }

  async renderCreateContactModal() {

    document.getElementById('contact_name').setAttribute('value', '');
    document.getElementById('contact_lastname').setAttribute('value', '');
    document.getElementById('contact_cargo').setAttribute('value', '');
    document.getElementById('contact_email').setAttribute('value', '');
    document.getElementById('contact__input_direccion').setAttribute('value', '');

    this.fillContactsRegion();
    this.fillConctactsCompany();
  };

  async renderUpdateContactModal(contactId) {
    const result = await contactsService.getContact(contactId);
    // console.log(result.data);
    if (result.success) {
      document.getElementById('contact_name').setAttribute('value', result.data.username);
      document.getElementById('contact_lastname').setAttribute('value', result.data.lastname);
      document.getElementById('contact_cargo').setAttribute('value', result.data.job_tittle);
      document.getElementById('contact_email').setAttribute('value', result.data.email);
      if(result.data.address) {
      // console.log(result.data.address); 
        document.getElementById('contact__input_direccion').setAttribute('value', result.data.address);
      }else{
        document.getElementById('contact__input_direccion').setAttribute('value', '');
      }
      //remove disable contact__input_direccion
      // document.getElementById('contact__input_direccion').removeAttribute('disabled');
      //set style width to progress-bar
      // document.querySelector('.progress-bar').style.width = `${result.data.interest}%`;
      //set value progress-bar
      functions.fillSlider(result.data.interest);

      // const interes  = result.data.interes;
      const cityId = result.data.cities.id;
      const companyId = result.data.companies_id;
      this.reverseFillContactsRegion(cityId);
      this.reverseFillContactsCompany(companyId);

      //create channel for each channel in channels array
      const channels = result.data.contacts_channels;
      // console.log(channels);

      functions.fillChannels(channels);



    }else{
      console.log(result.message);
      return false;
    }

  }

  async reverseFillContactsCompany(companyId){
    // const companyValue = await companiesService.getCompany(companyId);
    // console.log(companyValue);
    //fill selector for companies
    const companies = await companiesService.getCompanies();
    // console.log(companies);
    functions.fillSelector('#contact__select_compania', companyId, companies.rows);


  }

  async reverseFillContactsRegion(cityId) {
    const cityValue = await citiesService.getDataId(cityId);
    // console.log(cityValue);
    const countryId = cityValue.data.countries_id;
    // console.log(countryId);

    const countryValue = await countriesService.getDataId(countryId);
    const regionId = countryValue.data.regions_id;

    //fill selectors for regions
    const regions = await regionsService.getData();
    // console.log(regions.data);
    functions.fillSelector('#contact__select_region', regionId, regions.data);

    //fill selectors for countries
    const countries = await countriesService.getData(regionId);
    // console.log(countries.data);
    functions.fillSelector('#contact__select_pais', countryId, countries.data.countries);
  
    //fill selectors for cities
    const cities = await citiesService.getData(countryId);
    // console.log(cities.data);
    functions.fillSelector('#contact__select_ciudad', cityId, cities.data.cities);

  }

  async fillContactsRegion() {
    //fill selectors for regions
    const regions = await regionsService.getData();
    // console.log(regions.data);
    functions.fillSelector('#contact__select_region', -1, regions.data, false);
    // const regionId = regions.data[0].id;

    // //fill selectors for countries
    // const countries = await countriesService.getData(regionId);
    // // console.log(countries.data);
    // functions.fillSelector('#contact__select_pais', -1, countries.data.countries, false);
    // const countryId = countries.data.countries[0].id;

    // //fill selectors for cities
    // const cities = await citiesService.getData(countryId);
    // // console.log(cities.data);
    // functions.fillSelector('#contact__select_ciudad', -1, cities.data.cities, false);

  }

  async fillConctactsCompany() {
    //fill selectors for companies
    const companies = await companiesService.getCompanies();
    // console.log(companies);
    functions.fillSelector('#contact__select_compania', -1, companies.rows, false);
  }

  async renderSelectCompanies() {
    const companySelect = document.getElementById('company-select');
    companySelect.innerHTML = '';
    const _selected = document.createElement('option');
    _selected.setAttribute('value', '0');
    _selected.innerHTML = 'Compañia';
    
    companySelect.appendChild(_selected);

    const _list = await companiesService.getCompanies();

    _list.forEach(element => {
      const _option = document.createElement('option');
      const companyId = `${element.companyId}`;
      _option.setAttribute('value', companyId);
      _option.innerHTML = `${element.c_name}`;
      
      companySelect.appendChild(_option);
    });
  }

  async sendContactChannel(contactId, new_channel){
    const result_channels = await contactsService.postDataChannels (contactId, new_channel);
    // console.log(result_channels);

    if (result_channels.success) {
      this.renderContacts();
      //launch swalfire message
    } else {
      //launch swalfire message else
      console.log(result_channels);
    }

  }
  
  async sendContact(newContact) {

    const addElement = (ele, _contactId)=>{
      ele.contacts_id = _contactId
      return ele
    }
  

    newContact.users_id = this.loginUserId;
    const channels =[ ...newContact.contacts_channels]; //clone
    newContact.contacts_channels = undefined;

    const result = await contactsService.postData(newContact);
    // console.log(newContact);
    if (result.success) {
      const contactId = result.data;
      const new_channels = channels.map(ele => addElement(ele, contactId))
      
      new_channels.forEach(channel => {
        this.sendContactChannel(contactId, channel);
      })
      this.renderContacts();

      Swal.fire({
        title: 'El contacto ha sido creado con éxito.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
        });
     
      setTimeout(() => {
        myContactModal.hide();
      }, 500);


    }else{
      console.log(result);
    }
    
  }

  async editContact(contactId) {

    const addElement = (ele, _contactId)=>{
      ele.contacts_id = _contactId
      return ele
    }

    const _contactData = functions.getContactData();

    if (!_contactData) {
      return false;
    }

    _contactData.users_id = this.loginUserId;
    const channels =[ ..._contactData.contacts_channels]; //clone
    _contactData.contacts_channels = undefined;

    //delete previous channels
    await contactsService.deleteContactChannels(contactId);

    const result = await contactsService.putData(contactId, _contactData);
    if (result.success) {
      const contactId = result.data;
      const new_channels = channels.map(ele => addElement(ele, contactId))

      new_channels.forEach(channel => {
        this.sendContactChannel(contactId, channel);
      })
      this.renderContacts();

      Swal.fire({
        title: 'El contacto ha sido modificado con éxito.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
        });
     
      setTimeout(() => {
        myContactModal.hide();
      }, 500);
     

    }else{
      console.log(result);
    }

  }

  async deleteContact(contactId) {

    const _result = await contactsService.deleteContact(contactId);
    // console.log(_result);
    if (_result.success) {
      this.renderContacts();
    }else{

    }
    
  }
//COMPANIAS 
  async renderCompaniesTable() {
    const _datos = await companiesService.getCompanies();
    // console.log(_datos);
    companyTable.initTable(_datos);
  }
  async renderCreateCompanyModal(){
    // functions.clearCompanyData();
    document.getElementById('company_name').setAttribute('value', '');
    document.getElementById('company_email').setAttribute('value', '');
    document.getElementById('company_phone').setAttribute('value', '');
    document.getElementById('company_address').setAttribute('value', '');

    this.fillCompaniesRegion();
   
  }
  async renderUpdateCompanyModal(companyId){
    const result = await companiesService.getData(companyId)
    const data = result.data;
    console.log(result);
   

    if (result.success) {
      document.getElementById('company_name').setAttribute('value', data.name);
      document.getElementById('company_address').setAttribute('value', data.address);   
      document.getElementById('company_email').setAttribute('value', data.email); 
      document.getElementById('company_phone').setAttribute('value', data.phone);

      const cityId = data.cities.id;
      //reverse fill selected company region country city
      this.reverseFillCompaniesRegion(cityId);
    }else{
      return false;
    }

  }
  async sendCompany(newCompany) {
    const result = await companiesService.postData(newCompany);

    if (result.success) {
      this.renderCompaniesTable();

      Swal.fire({
        title: 'La compañía ha sido creada con éxito.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
        });
           
      setTimeout(() => {
        myCompanyModal.hide();
      }, 500); 
      companyForm.reset();
    }else{
      // console.log(result);
      if (result.hasOwnProperty('error')){
        Object.values(result.error).forEach(msg => {  
          this.renderMessage(msg, 'danger', document.querySelector('#companyModal .modal-body'));
        }); 
      }else{
        if (result.hasOwnProperty('message')){
          Swal.fire({
            icon: 'error',
            text: result.message
          });
        }
      }
    }
  }
  async editCompany(companyId) {
    const _companyData = functions.getCompanyData();
    // console.log(_companyData);
    
    if (!_companyData) {
      return false;
    }
    const result = await companiesService.putData(companyId, _companyData);
    
    
    
    if (result.success) {
      this.renderCompaniesTable();

      Swal.fire({
        title: 'La compañía ha sido modificada con éxito.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
        });

      setTimeout(() => {
        myCompanyModal.hide();
      }, 1500); 

    }else{
      console.log(result);
      if (result.hasOwnProperty('error')){
        Object.values(result.error).forEach(msg => {  
          this.renderMessage(msg, 'danger', document.querySelector('#companyModal .modal-body'));
        }); 
      }
    }
    
    companyForm.reset();
  }
  async deleteCompany(companyId) {
    
      const _result = await companiesService.deleteData(companyId);
      // console.log(_result);
      if (_result.success) {
        this.renderCompaniesTable();
        return true;
      }else{
        return false;
      }
     
  }
  async reverseFillCompaniesRegion(cityId) {
    const cityValue = await citiesService.getDataId(cityId);
    console.log(cityValue);
    const countryId = cityValue.data.countries_id;
    console.log(countryId);

    const countryValue = await countriesService.getDataId(countryId);
    const regionId = countryValue.data.regions_id;
    // console.log(regionId);

    //fill selectors for regions
    const regions = await regionsService.getData();
    // console.log(regions.data);
    functions.fillSelector('#company_region', regionId, regions.data);

    //fill selectors for countries
    const countries = await countriesService.getData(regionId);
    // console.log(countries.data);
    functions.fillSelector('#company_country', countryId, countries.data.countries);
  
    //fill selectors for cities
    const cities = await citiesService.getData(countryId);
    // console.log(cities.data);
    functions.fillSelector('#company_city', cityId, cities.data.cities);
  
  }

  async fillCompaniesRegion(){
    //fill selectors for regions
    const regions = await regionsService.getData();
    // console.log(regions.data);
    functions.fillSelector('#company_region', -1, regions.data);
    const regionId = regions.data[0].id;

    //fill selectors for countries
    const countries = await countriesService.getData(regionId);
    // console.log(countries.data);
    functions.fillSelector('#company_country', -1, countries.data.countries);
    const countryId = countries.data.countries[0].id;

    //fill selectors for cities
    const cities = await citiesService.getData(countryId);
    // console.log(cities.data);
    functions.fillSelector('#company_city', -1, cities.data.cities);

  } 


  //USUARIOS
  async renderUsersTable() {
    const _datos = await usersService.getUsers();
    userTable.initTable(_datos);
  }
  async renderCreationUserModal() {
    // functions.clearUserData(); 
    document.getElementById('last_name').removeAttribute('disabled');
    document.getElementById('user_name').removeAttribute('disabled');
    document.getElementById('user_email').removeAttribute('disabled');

    document.getElementById('last_name').setAttribute('value','');
    document.getElementById('user_name').setAttribute('value', '');
    document.getElementById('user_email').setAttribute('value', '');
    document.getElementById('user_password').setAttribute('value', '');
    document.getElementById('confirm_password').setAttribute('value', '');   

  }
  async renderEditUserModal(userId) {
    const result = await usersService.getUser(userId);
    const data = result.data;

    if (result.success) {
        document.getElementById('last_name').setAttribute('value', data.lastname);
        document.getElementById('user_name').setAttribute('value', data.username);   
        document.getElementById('user_email').setAttribute('value', data.email); 
        document.getElementById('user_password').setAttribute('value', '');
        document.getElementById('confirm_password').setAttribute('value', '');   
        document.getElementById('user_name').setAttribute('disabled', "");
        document.getElementById('last_name').setAttribute('disabled', "");
        document.getElementById('user_email').setAttribute('disabled', "");
    } 
  }
  async sendUser(newUser) {
    const result = await usersService.postUser(newUser);  //{status:xxxx, data:xxxxx}
    // console.log(result.data);


    if (result.success) {
      this.renderUsersTable();

      Swal.fire({
        title: 'El usuario ha sido creado con éxito.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
        });
     
      setTimeout(() => {
        myUserModal.hide();
      }, 500);
      userForm.reset(); 
    }else{
      console.log(result);
      if (result.hasOwnProperty('error')){
        Object.values(result.error).forEach(msg => {  
          this.renderMessage(msg, 'danger', document.querySelector('#companyModal .modal-body'));
        }); 	
      }else{
        if (result.hasOwnProperty('message')){
          Swal.fire({
            icon: 'error',
            text: result.message
          });
        }
      } 
    }
  }
  async editUser(userId) {
    const _userData = functions.getUserData();

    if (!_userData){
        return false;  
    }
    const result = await usersService.putUser(userId, _userData);


    if (result.success) {
      this.renderUsersTable();

      Swal.fire({
        title: 'El Usuario ha sido modificado con éxito.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });

      
      setTimeout(() => {
        myUserModal.hide();
      }, 1500); 
      userForm.reset();
    }else{
   
      console.log(result);
      if (result.hasOwnProperty('error')){
        Object.values(result.error).forEach(msg => {  
          this.renderMessage(msg, 'danger', document.querySelector('#companyModal .modal-body'));
        }); 
      }else{
        if (result.hasOwnProperty('message')){
          Swal.fire({
            icon: 'error',
            text: result.message
          });
        }
      }
    }
  }
  async deleteUser(userId) {
      const _result = await usersService.deleteUser(userId);
      if (_result.success) {
        return true;
      }else{
       return false; 
      }
  }

  //REGIONS TAB

  async renderTreeviewRegions(){
    const _datos = await regionsService.getTreeViewData();
    this.treeView.datos = _datos.data;
    this.treeView.initTreeView();
  }
  
  async renderRegions() {
    const regionsList = await regionsService.getData();
    if (regionsList.data.length > 0) {
      return regionsList.data;
    } else {
      return [];
    }
  }

  async renderCountries(regionId) {
    const countryList = await countriesService.getData(regionId);
    // console.log(countryList);
    if (countryList.data.countries.length > 0) {
      const countries = countryList.data.countries.filter(country => country.isactive === true);
      return countries;
    }else
    {
      return [];
    }
  }

  async renderCities(countryId) {
    // const _cities = await citiesService.getData(countryId);
    
    const cityList = await citiesService.getData(countryId);
    // console.log(cityList);
    if (cityList.data.cities.length > 0) {
      return cityList.data.cities;
    }else
    {
      return [];
    }
  }

  async sendRegion(name) {
    const result = await regionsService.postData(name);

    // console.log(result);

    if (result.success) {
     //todo make render message
      Swal.fire(
        'Agregado',
        'Nueva region ha sido agredada.',
        'success'
      )
      this.renderTreeviewRegions();
    }else{
      //todo render error message
      Swal.fire(
        'Error!',
        result.error.join('\n'),
        'error'
      )
    }
  }
  async sendCountry(regionid, body) {
    const result = await countriesService.postData(regionid, body);

    if (result.success) {
      Swal.fire(
        'Agregado',
        'Nuevo pais ha sido agredado.',
        'success'
        )
        this.renderTreeviewRegions();
    }else{
      Swal.fire(
        'Error!',
        result.error.join('\n'),
        'error'
      )
    }
  }
  async sendCity(countryid, body) {
    const result = await citiesService.postData(countryid, body);

    if (result.success) {
      Swal.fire(
        'Agregado',
        'Nueva ciudad ha sido agredada.',
        'success'
        )
        this.renderTreeviewRegions();
    }else{
      //todo render error message
      Swal.fire(
        'Error!',
        result.error.join('\n'),
        'error'
      )
    }
  }
  async deleteRegion(regionId) {

    const response = await regionsService.deleteData(regionId);

    if (response.success) {
      Swal.fire(
        'Eliminado',
        'La Region ha sido eliminada,',
        'success'
      )
      this.renderTreeviewRegions();
        
    }else{
      Swal.fire(
          'Error',
          response.error,
          'error'
      )
    }
  }
  async deleteCountry(countryId) {
    const response = await countriesService.deleteData(countryId);
    if (response.success) {
      Swal.fire(
        'Eliminado',
        'El Pais ha sido eliminado.',
        'success'
      )
      this.renderTreeviewRegions();
        
    }else{
      Swal.fire(
          'Error',
          response.error,
          'error'
      )
    }
  }
  async deleteCity(cityId) {
    const response = await citiesService.deleteData(cityId);
    if (response.success) {
      Swal.fire(
        'Eliminada',
        'La ciuidad ha sido eliminada.',
        'success'
      )
      this.renderTreeviewRegions();
        
    }else{
      const error = response.error;
      const companias = response.data.companies.map(c => c.name).slice(0,5).join('</br>');
      const contactos = response.data.contacts.map(c => c.username).slice(0,5).join('</br>');
      console.log(companias);
      console.log(contactos);
      let data = '<p>'+ error + '</br>';
      data = data + 'Companias: ' + response.data.total_companies + '' + '\n' + 'Contactos: ' + response.data.total_contacts + '</p>';
      Swal.fire(
          'Error',
          data,
          'error'
      )
    }  
  }
  async editRegion(regionId) {
    // console.log(regionId);
    const regionData = await regionsService.getDataId(regionId);
    // console.log(regionData);

    if(regionData.success){
    
      const regionName = regionData.data.name;
      // console.log(regionName);
      const { value: newName } = await Swal.fire({
        title: 'Edicion de region',
        input: 'text',
        inputLabel: 'Nuevo Nombre',
        inputValue: regionName,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Se debe agregar un nombre válido.'
          }
        }
      })

      if (newName) {
        const response = await regionsService.putData(regionId,{name:newName} );
        if (response.success) {
          Swal.fire(
            'Editado',
            'Region ha sido editado.',
            'success'
          )
          this.renderTreeviewRegions();
        }else{
          // console.log(response.error);
          Swal.fire(
            'Error',
            response.error.join('\n'),
            'error'
          )
        }
      }
    }else{
      Swal.fire(
        'Error',
        regionData.message.message,
        'error'
      )
    }
  }

  async editCountry(countryId) {
    const countryData = await countriesService.getDataId(countryId);
    if(countryData.success){
      const countryName = countryData.data.name;
      const { value: newName } = await Swal.fire({
        title: 'Edicion de Pais',
        input: 'text',
        inputLabel: 'Nuevo Nombre',
        inputValue: countryName,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Se debe agregar un nombre válido.'
          }
        }
      })

      if (newName) {
        const response = await countriesService.putData(countryId,{name:newName} );
        if (response.success) {
          Swal.fire(
            'Editado',
            'Region ha sido editado.',
            'success'
          )
          this.renderTreeviewRegions();
        }else{
          console.log(response);
          Swal.fire(
            'Error',
            response.error.join('\n'),
            'error'
          )
        }
      }
    }else{
      Swal.fire(
        'Error',
        countryData.message.message,
        'error'
      )
    }
  }
  async editCity(cityId) {
    const cityData = await citiesService.getDataId(cityId);
    if(cityData.success){
      const cityName = cityData.data.name;
      // console.log(cityName);
      const { value: newName } = await Swal.fire({
        title: 'Edicion de Ciudad',
        input: 'text',
        inputLabel: 'Nuevo Nombre',
        inputValue: cityName,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Se debe agregar un nombre válido.'
          }
        }
      })

      if (newName) {
        const response = await citiesService.putData(cityId,{name:newName} );
        if (response.success) {
          Swal.fire(
            'Editado',
            'Region ha sido editado.',
            'success'
          )
          this.renderTreeviewRegions();
        }else{
          // console.log(response.error);
          Swal.fire(
            'Error',
            response.error.join('\n'),
            'error'
          )
        }
      }
    }else{
      Swal.fire(
        'Error',
        cityData.message.message,
        'error'
      )
    } 

  }

  async renderMessage(message, type = 'primary', container = alertPlaceholder) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + 
    ' alert-dismissible" role="alert">' + message + 
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    container.append(wrapper)

    setTimeout(() => {
      if (wrapper.parentNode === container) {
        container.removeChild(wrapper);
      }
    }, 2000);
  }

  async renderModalMessage(message = 'Nuevo Usuario Creado') {
    const wrapper = document.createElement('div')
    const container = document.querySelector('.modal-body');
    wrapper.innerHTML = container.innerHTML;
    container.innerHTML = ['<div class="alert alert-success" role="alert">',
    '<h4 class="alert-heading">Operacion Exitosa!</h4>',
    '<p>'+ message + '</p>',
    '<hr>',
    '</div>'].join('')
  
    // container.append(wrapper)
    console.log('================================')
    setTimeout(() => {
      container.innerHTML = wrapper.innerHTML;
    }, 1000);

  }
}

export default UI;

 
