
document.addEventListener("DOMContentLoaded", function() {

    
    
    window.onload = function() {
        document.getElementById("txtTitle").innerHTML="Estados";
    }

    let estados = $("#tablaestado").DataTable({
        "ajax": {
            url: "data_estado.php?accion=listar",
            dataSrc: ""
        },
        "columns": [{
            "data": "id"
        },
        {
            "data": "nombre"
        },
        {
            "data": null,
            "orderable": false
        },
        {
            "data": null,
            "orderable": false
        }],
        "columnDefs": [{
            targets: 2,
            "defaultContent": "<button class='btn btn-sm btn-primary botonmodificar'>Modifica?</button>",
            data: null
        }, {
            targets: 3,
            "defaultContent": "<button class='btn btn-sm btn-primary botonborrar'>Borra?</button>",
            data: null
        }],
        "language": {
            "url": "DataTables/spanish.json",
        },
    });


})