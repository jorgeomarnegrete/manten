
document.addEventListener("DOMContentLoaded", function() {

    
    
    window.onload = function() {
        document.getElementById("txtTitle").innerHTML="Máquinas";
    }

    let maquinas = $("#tablamaquinas").DataTable({
        "ajax": {
            url: "data_maquinas.php?accion=listar",
            dataSrc: ""
        },
        "columns": [{
            "data": "id"
        },
        {
            "data": "nombre"
        },
        {
            "data": "sector"
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
            targets: 3,
            "defaultContent": "<button class='btn btn-sm btn-primary botonmodificar'>Modifica?</button>",
            data: null
        }, {
            targets: 4,
            "defaultContent": "<button class='btn btn-sm btn-primary botonborrar'>Borra?</button>",
            data: null
        }],
        "language": {
            "url": "DataTables/spanish.json",
        },
    });

    $('#tablamaquinas tbody').on('click', 'button.botonmodificar', function() {
        $('#ConfirmarAgregar').hide();
        $('#ConfirmarModificar').show();
        let registro = sectores.row($(this).parents('tr')).data();
        recuperarRegistro(registro.id);
    });


    //Eventos de botones de la aplicación
    $('#BotonAgregar').click(function() {
        $('#ConfirmarAgregar').show();
        $('#ConfirmarModificar').hide();
        limpiarFormulario();
        $("#FormularioDoc").modal('show');

    });

    $('#ConfirmarAgregar').click(function() {
        $("#FormularioDoc").modal('hide');
        let registro = recuperarDatosFormulario();
        agregarRegistro(registro);
    });


    $('#ConfirmarModificar').click(function() {
        $("#FormularioDoc").modal('hide');
        let registro = recuperarDatosFormulario();
        modificarRegistro(registro);
    });


    //Funciones de manejo de formulario

    function limpiarFormulario(){
        $('#txtId').val('');
        $('#txtNombre').val('');
        $('#slcSector').val('');
    }


    function recuperarDatosFormulario() {
        let registro = {
          id: $('#txtId').val(),
          codigo: $('#txtCodigo').val(),
          nombre: $('#txtNombre').val()
          };
        return registro;
    }


    //Funciones para comunicarse con la capa de datos en ajax
    function agregarRegistro(registro) {

        $.ajax({
          type: 'POST',
          url: 'data_sectores.php?accion=agregar',
          data: registro,
          success: function(msg) {
            sectores.ajax.reload();
          },
          error: function() {
            alert("Hay un problema al intentar agregar un registro");
          }
        });
    }


    function modificarRegistro(registro) {
        $.ajax({
          type: 'POST',
          url: 'data_sectores.php?accion=modificar&id=' + registro.id,
          data: registro,
          success: function(msg) {
            sectores.ajax.reload();
          },
          error: function() {
            alert("Hay un problema al intentar modificar el registro");
          }
        });
    }

    function recuperarRegistro(id) {
        $.ajax({
          type: 'GET',
          url: 'data_sectores.php?accion=consultar&id=' + id,
          data: '',
          success: function(datos) {
            $('#txtId').val(datos[0].id);
            $('#txtCodigo').val(datos[0].codigo);
            $('#txtNombre').val(datos[0].nombre);
            $("#FormularioDoc").modal('show');
          },
          error: function() {
            alert("Hay un problema al recuperar el registro");
          }
        });
    }

})