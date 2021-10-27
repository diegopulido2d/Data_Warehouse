const $table_company = $('#table-companies');


class CompanyTable {

    initTable(datos) {	
        $table_company.bootstrapTable("destroy").bootstrapTable({
            data: datos,
            locale: "es-ES",
            columns: [
                [
                {
                    title: 'id',
                    field: "id",
                    align: "center",
                },
                {   
                    title: 'Nombre',
                    field: "name",
                    sortable: true,
                },
                {
                    title: 'Direccion',
                    field: "address",
                    sortable: true,
                },
                {
                    title: 'Correo',
                    field: "email",
                    sortable: true,
                },
                {
                    title: 'Telefono',
                    field: "phone",
                    sortable: true,
                },
                {
                    title: 'Ciudad',
                    field:"cities.name",
                    sortable: true,
                },
                {
                    title: 'Acciones',
                    field: "acciones",
                    align: "center",
                    valign: 'middle',
                    width: 82,
                    class: 'acciones-table',
                    formatter: Acciones
                    }]
            ]
        });

        function Acciones(value, row, index){
            
            const ParamsEdit = 'function:update_Id:'+ row.id;
            
            return [
                '<div class="ellipsis_actions">...</div><div class="overlay_actions"><a id="editCompanyBtn" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#companyModal" data-_id="'+ row.id +'" data-bs-whatever="'+ ParamsEdit + '">',
                '<i class="fa fa-edit"></i>',
                '</a> &nbsp; ',
                '<a name="deleteCompanyBtn_'+ index +'" Onclick=deleteCompany(this);return false;" class="btn btn-danger btn-sm" data-_id="'+ row.id +'" >',
                '<i class="fa fa-trash"></i>',
                '</a></div>'
            ].join("");

           
        }
    }




}

export default CompanyTable;