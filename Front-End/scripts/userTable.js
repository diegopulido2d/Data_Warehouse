const $table_user = $('#table-user');
const $userModal = document.getElementById('userModal');

class UserTable {

    initTable(datos) {	
        $table_user.bootstrapTable("destroy").bootstrapTable({
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
                    field: "username",
                    sortable: true,
                },
                {
                    title: 'Apellido',
                    field: "lastname",
                    sortable: true,
                },
                {
                    title: 'Correo',
                    field: "email",
                    sortable: true,
                },
                {
                    title: 'Rol (Administrador)',
                    field: "isadmin",
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
            
            const ParamsEdit = 'function:edit_Id:'+ row.id;
            
            return [
                '<div class="ellipsis_actions">...</div><div class="overlay_actions"><a id="editUserBtn" "Onclick=console.log(this);return false;" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#userModal" data-_id="'+ row.id +'" data-bs-whatever="'+ ParamsEdit + '">',
                '<i class="fa fa-edit"></i>',
                '</a> &nbsp; ',
                '<a name="deleteUserBtn_'+ index +'" Onclick=deleteUser(this);return false;" class="btn btn-danger btn-sm" data-_id="'+ row.id +'" >',
                '<i class="fa fa-trash"></i>',
                '</a></div>'
            ].join("");

           
        }
    }




}

export default UserTable;