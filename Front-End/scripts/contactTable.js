const $table_contacts = $('#table-contacts');
let $remove = $("#remove");
let $seleccionados = $("#seleccionados"); 
let selections = [];



class ContactTable {
  initTable(datos) {
    $table_contacts.bootstrapTable("destroy").bootstrapTable({
        data: datos,
        exportDataType: "selected",
        exportTypes: ["json", "csv", "txt", "excel"],
        locale: "es-ES",
        ignoreClickToSelectOn: this.ignoreClickToSelectOn,
        exportOptions: {
            fileName: 'contacts',
            ignoreColumn: [4,5,6],
            worksheetName: 'Contacts',
            csvFileName: 'contacts.csv',
            csvSeparator: ';',
            csvEnclosure: ""
        },
        columns: [{
            field: 'state',
            valign: 'middle',
            width: 54,
            checkbox: true,
        }, {
            title: 'Contacto<span class="d-none">;Correo</span>',
            field: "id",
            sortable: true,
            valign: 'middle',
            width: 300,
            formatter: this.contactFormatter,
        }, {
            title: 'Pais<span class="d-none">;</span>/Region',
            field: "cities.countries.name",
            sortable: true,
            valign: 'middle',
            width: 120,
            formatter: this.countryFormatter,
        }, {
            title: "Compañia",
            field: "companies.name",
            sortable: true,
            valign: 'middle',
            width: 200,
            formatter: this.companyFormatter
        }, 
        {
            title: "Cargo",
            field: "job_tittle",
            valign: 'middle',
            sortable: true,
            width: 120,
        },
        {
            title: "Canal Preferido",
            field: "contacts_channels",
            valign: 'middle',
            width: 170,
            formatter: this.channelsFormatter,
        },
        {
            title: "Interes",
            field: "interest",
            valign: 'middle',
            sortable: true,
            width: 170,
            formatter: this.interestFormatter,
        },
        {
            field: 'actions',
            title: 'Acciones',
            align: 'center',
            valign: 'middle',
            width: 95,
            class: 'acciones-table',
            formatter: this.actionsFormatter,
            events: operateEvents
        }]
    });

    $table_contacts.on(
        "check.bs.table uncheck.bs.table " +
        "check-all.bs.table uncheck-all.bs.table",
        function () {
            $remove.prop("disabled", !$table_contacts.bootstrapTable("getSelections").length);
            
            // save your data, here just save the current page
            selections = getIdSelections();
            if (selections.length > 0) {
                // $remove.removeClass("d-none");
                $remove.css("opacity", "1");
                $seleccionados.removeClass("d-none");
                $seleccionados.text(selections.length + ' seleccionados');  
            }else{
                $seleccionados.addClass("d-none"); 
                // $remove.addClass("d-none");
                $remove.css("opacity", "0");
            }
            
        }
    );



    function getIdSelections() {
        return $.map($table_contacts.bootstrapTable("getSelections"), function (row) {
            return row.id;
        });
    };

    $remove.click(function () {
        var ids = getIdSelections();

        Swal.fire({
            title: 'Está seguro?',
            text: "La operacion de eliminacion no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar seleccion!'
          }).then((result) => {
            if (result.isConfirmed) {

                $table_contacts.bootstrapTable("remove", {
                    field: "id",
                    values: ids,
                });
                $remove.prop("disabled", true);
                $remove.css("opacity", "0");
                $seleccionados.addClass("d-none");

                //send to global process of deleted
                deleteContacts(ids);

            }})


    });


  }



    // contactFormatter
    contactFormatter(value, row, index) {
        return [
            '<div class="d-flex align-items-center">',
            '<img class="rounded-circle" loading="lazy" src="./images/user.png  " width="30">',
            '<div class="ms-2">',
            '<div style="font-size:1rem" class="text-nowrap text-truncate">' + row.username + ' ' + row.lastname + '</div>',
            '<div style="font-size:0.9rem;color:#6c757d"> <span class="d-none">;</span>' + row.email + '</div>',
            "</div>",
            "</div>",
        ].join("");
    }

    countryFormatter(value, row, index) {
        return [
            '<div class="d-flex-inline align-items-center">',
            '<div style="font-size:1rem" class="text-nowrap text-truncate">' + row.cities.countries.name + '</div>',
            '<div style="font-size:0.9rem;color:#6c757d "><span class="d-none">;</span>' + row.cities.countries.regions.name + '</div>',
            "</div>",
            "</div>",
        ].join("");
    }

    companyFormatter(value, row, index) {
        return [
            '<span class="d-inline-block text-truncate" style="max-width: 180px;">' + value + '</span>',
        ].join("");
    }

    channelsFormatter(value, row, index) {
        let container = ['<div class="d-flex">'];
        let items = [];
        let canales = [];
        let items_container = ['<div class="ellipsis_container">','<div>...</div>','<div class="channel_container">'];
        let fenabled = false;
        let count = value.length;
        
        if (value.length > 1) {
    
            for (let i = 0; i < count; i++) {
                if (i<2) { //normal container
                    items.push('<span data-id="'+i+'" style="line-height:24px;" class="channels-table m-1 rounded text-center ">' + value[i].channels.name + '</span>');
                }else{ //last container

                    fenabled = true;
                    items_container.push('<div data-id="'+i+'" style="width:64px;height:24px;" class="channels-table m-1 rounded text-center">' + value[i].channels.name + '</div>');
                }
            }


            
        } else {
            items = value.map(v => {
                return '<span class="channels-table rounded text-center text-truncate">' + v.channels.name + '</span>'
            });
        }
    
        if (fenabled) {
            items_container.push('</div></div>');
            const ellipsis_container = items_container.join("");
            canales = container.concat(items, items_container,'</div>');
        }else{
            canales = container.concat(items, '</div>');
        }
               
        return canales.join("");
    
    }

    ignoreClickToSelectOn(e) {
        // console.log(e.tagName);
        return ['A', 'BUTTON', 'LABEL', 'I'].indexOf(e.tagName) > -1
    }

    interestFormatter(value, row, index) {
        // console.log(value);
        return [
            '<div style="line-height:8px" class="container-fluid d-flex p-2">',
            '<div class="col-2">' + value + '%</div>',
            '<div class="container-slider ms-4">',
            '<div class="skill slider-' + value + '"></div>',
            '</div>',
            '</div>',
        ].join("");
    }

    actionsFormatter(value, row, index) {

        const ParamsEdit = 'function:update_Id:'+ row.id;

        return [
            '<div class="overlay_actions"><a class="edit btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#contactsModal" data-_id="'+ row.id +'" data-bs-whatever="'+ ParamsEdit + '">',,
            '<i class="fa fa-edit"></i>',
            "</a>  ",
            '<a class="remove btn btn-danger btn-sm" href="javascript:void(0)" title="Remove">',
            '<i class="fa fa-trash"></i>',
            "</a></div>",
        ].join("");
    }


}

export default ContactTable;