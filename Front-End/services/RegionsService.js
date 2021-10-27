import MainService from '../services/MainService.js';

const mainService = new MainService();

class RegionsService {

    async getTreeViewData() {
        const response = await mainService.httpRequest('regions/treeview', 'GET');
        const _data = response.data;
        return _data; 
    }

    async getData() {
        const response = await mainService.httpRequest('regions', 'GET');
        const _data = response.data;
        return _data;
    }

    async getDataId(regionId) {
        const response = await mainService.httpRequest('regions/regionid/' + regionId, 'GET');
        const _data = response.data;
        return _data;
    }
    async postData(newRegion) {
        //console.log(newRegion);
        const response = await mainService.httpRequest('regions', 'POST', newRegion);
        const _data = response.data;
        return _data;
    }
    async putData(regionId, name) {
        const response = await mainService.httpRequest('regions/' + regionId, 'PUT', name);
        const _data = response.data;
        return _data;
    }
    async deleteData(regionId) {
        const response = await mainService.httpRequest('regions/' + regionId, 'DELETE');
        const _data = response.data;
        return _data;
    }
}

export default RegionsService;