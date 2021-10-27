import MainService from '../services/MainService.js';

const mainService = new MainService();

class LoginService {

    async postLogin(user) {
        const response = await mainService.httpRequest('users/login', 'POST', user);
        const result = { status: response.status, data: await response.data};
        // console.log(result);
        return result;
    }

    async getLogin() {
        const response = await mainService.httpRequest('users/checkJWT', 'GET');
        const result = { status: response.status, data: await response.data};
        return result;
    }
}

export default LoginService;
