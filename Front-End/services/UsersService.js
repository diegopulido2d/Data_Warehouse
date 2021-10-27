import MainService from './MainService.js';

const mainService = new MainService();

class UsersService {

    async getUsers() {
        const response = await mainService.httpRequest('users', 'GET');
        const _dataTable = response.data;
        return _dataTable;
    }
    async getUser(userId) {
        const response = await mainService.httpRequest('users/getUserByID/' + userId, 'GET');
        const _data = response.data;
        return _data;
    }
    async postUser(user) {
        const response = await mainService.httpRequest('users', 'POST', user);
        const _data = response.data;
        return _data;
    }
    async putUser(userId, userData) {
        const response = await mainService.httpRequest('users/' + userId, 'PUT', userData);
        const _data = response.data;
        return _data;
    }
    async deleteUser(userId) {
        const response = await mainService.httpRequest('users/' + userId, 'DELETE');
        const _data = response.data;
        return _data;
    }

}

export default UsersService;