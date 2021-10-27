import MainService from '../services/MainService.js';

const mainService = new MainService();

class ContactsService {

    async getContacts() {
        const response = await mainService.httpRequest('contacts', 'GET');
        const _data = response.data;
        return _data;
    }
    async getContact(contactId) {
        const response = await mainService.httpRequest('contacts/' + contactId, 'GET');
        const _data = response.data;
        return _data;
    }
    async postData(newContact) {
        const response = await mainService.httpRequest('contacts', 'POST', newContact);
        const _data = response.data;
        return _data;
    }
    async postDataChannels(contactId, data) {
        const response = await mainService.httpRequest('contacts/' + contactId + '/channels', 'POST', data);
        const _data = response.data;
        return _data;
    }

    async putData(contactId, contactData) {
        const response = await mainService.httpRequest('contacts/' + contactId, 'PUT', contactData);
        const _data = response.data;
        return _data;
    }
    async deleteContact(contactId) {
        const response = await mainService.httpRequest('contacts/' + contactId, 'DELETE');
        const _data = response.data;
        return _data;
    }

    async deleteContactChannels(contactId){
        const response = await mainService.httpRequest('contacts/' + contactId + '/channels', 'DELETE');
        const _data = response.data;
        return _data;
    }
}

export default ContactsService;