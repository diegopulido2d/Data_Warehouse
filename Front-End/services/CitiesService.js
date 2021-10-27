import MainService from './MainService.js';

const mainService = new MainService();

class CitiesService {
    async getData(countryId) {
        const response = await mainService.httpRequest('countries/countryId/' + countryId, 'GET');
        const _data = response.data;
        return _data;
    }
    async getDataId(cityId) {
        const response = await mainService.httpRequest('cities/cityid/' + cityId, 'GET');
        const _data = response.data;
        return _data;
    }
    async postData(countryId, data){
        const response = await mainService.httpRequest('countries/' + countryId + '/city', 'POST', data);
        const _data = response.data;
        return _data;
    }
    async putData(cityId, data) {
        const response = await mainService.httpRequest('cities/' + cityId, 'PUT', data);
        const _data = response.data;
        return _data;
    }
    async deleteData(cityId) {
        const response = await mainService.httpRequest('cities/' + cityId, 'DELETE');
        const _data = response.data;
        return _data;
    }
}

export default CitiesService;