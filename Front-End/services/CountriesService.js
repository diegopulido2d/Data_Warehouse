import MainService from '../services/MainService.js';

const mainService = new MainService();

class CountriesService {
    async getData(regionId) {
        const response = await mainService.httpRequest('regions/regionid/' + regionId, 'GET');
        const _data = response.data;
        return _data;
    }
    async getDataId(countryId) {
        const response = await mainService.httpRequest('countries/countryid/' + countryId, 'GET');
        const _data = response.data;
        return _data;
    }
    async postData(regionId, data) {
        const response = await mainService.httpRequest('regions/' + regionId + '/country', 'POST', data);
        const _data = response.data;
        return _data;
    }
    async putData(countryId, data) {
        const response = await mainService.httpRequest('countries/' + countryId, 'PUT', data);
        const result = response.data;
        return result;
    }
    async deleteData(countryId) {
        const response = await mainService.httpRequest('countries/' + countryId, 'DELETE');
        const _data = response.data;
        return _data;
    }
}

export default CountriesService;