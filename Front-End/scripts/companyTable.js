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
                    valign: 'middle',
                    width: 60
                },
                {   
                    title: 'Nombre',
                    field: "name",
                    sortable: true,
                    valign: 'middle',
                    width: 300
                },
                {
                    title: 'Direccion',
                    field: "address",
                    sortable: true,
                    valign: 'middle',
                    width: 500
                },
                {
                    title: 'Correo',
                    field: "email",
                    sortable: true,
                    valign: 'middle',
                    width: 200
                },
                {
                    title: 'Telefono',
                    field: "phone",
                    sortable: true,
                    valign: 'middle',
                    width: 200
                },
                {
                    title: 'Ciudad',
                    field:"cities.name",
                    sortable: true,
                    valign: 'middle',
                    width: 200
                },
                {
                    title: 'Acciones',
                    field: "acciones",
                    align: "center",
                    valign: 'middle',
                    width: 95,
                    class: 'acciones-table',
                    formatter: Acciones
                    }]
            ]
        });

        function Acciones(value, row, index){
            
            const ParamsEdit = 'function:update_Id:'+ row.id;
            
            return [
                '<div class="overlay_actions"><a id="editCompanyBtn" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#companyModal" data-_id="'+ row.id +'" data-bs-whatever="'+ ParamsEdit + '">',
                '<i class="fa fa-edit"></i>',
                '</a>',
                '<a name="deleteCompanyBtn_'+ index +'" Onclick=deleteCompany(this);return false;" class="btn btn-danger btn-sm" data-_id="'+ row.id +'" >',
                '<i class="fa fa-trash"></i>',
                '</a></div>'
            ].join("");

           
        }
    }




}

export default CompanyTable;