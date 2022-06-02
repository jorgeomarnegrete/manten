
document.addEventListener("DOMContentLoaded", function() {

    
    
    window.onload = function() {
        document.getElementById("txtTitle").innerHTML="OT";
        var acc = $_GET["accion"];
        alert(acc);
    }

    let ot = $("#tablaot").DataTable({
        "ajax": {
            url: "data_orden.php?accion=listar",
            dataSrc: ""
        },
        "columns": [{
            "data": "id"
        },
        {
            "data": "numero"
        },
        {
            "data": "fecha"
        },
        {
            "data": "maquina"
        },
        {
            "data": "falla"
        },
        {
            "data": "estado"
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
            targets: 6,
            "defaultContent": "<button class='btn btn-sm btn-primary botonmodificar'>Modifica?</button>",
            data: null
        }, {
            targets: 7,
            "defaultContent": "<button class='btn btn-sm btn-primary botonborrar'>Borra?</button>",
            data: null
        }],
        "language": {
            "url": "DataTables/spanish.json",
        },
    });

    $('#tablaot tbody').on('click', 'button.botonmodificar', function() {
        $('#ConfirmarAgregar').hide();
        $('#ConfirmarModificar').show();
        let registro = maquinas.row($(this).parents('tr')).data();
        recuperarRegistro(registro.id);
    });


    //Eventos de botones de la aplicación
    $('#BotonAgregar').click(function() {
        $('#ConfirmarAgregar').show();
        $('#ConfirmarModificar').hide();
        limpiarFormulario();
        llenarSectores(0);
        $("#FormularioDoc").modal('show');

    });

    $('#ConfirmarAgregar').click(function() {
        $("#FormularioDoc").modal('hide');
        let registro = recuperarDatosFormulario()
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
    }


    function recuperarDatosFormulario() {
        let registro = {
          id: $('#txtId').val(),
          nombre: $('#txtNombre').val(),
          sector: $('#slcSector').val()
          };
        return registro;
    }


    //Funciones para comunicarse con la capa de datos en ajax
    function agregarRegistro(registro) {

        $.ajax({
          type: 'POST',
          url: 'data_maquinas.php?accion=agregar',
          data: registro,
          success: function(msg) {
            maquinas.ajax.reload();
          },
          error: function() {
            alert("Hay un problema al intentar agregar un registro");
          }
        });
    }


    function modificarRegistro(registro) {
        $.ajax({
          type: 'POST',
          url: 'data_maquinas.php?accion=modificar&id=' + registro.id,
          data: registro,
          success: function(msg) {
            maquinas.ajax.reload();
          },
          error: function() {
            alert("Hay un problema al intentar modificar el registro");
          }
        });
    }

    function recuperarRegistro(id) {
        $.ajax({
          type: 'GET',
          url: 'data_maquinas.php?accion=consultar&id=' + id,
          data: '',
          success: function(datos) {
            $('#txtId').val(datos[0].id);
            $('#txtNombre').val(datos[0].nombre);
            llenarSectores(datos[0].sector);
            $("#FormularioDoc").modal('show');
          },
          error: function() {
            alert("Hay un problema al recuperar el registro");
          }
        });
    }

    function llenarSectores(id) {
        var sector = $("#slcSector");
        $.ajax({
          type: 'GET',
          url: 'data_sectores.php?accion=listar',
          data: '',
          success: function(t) {
            
            //Limpiamos el select
            sector.find('option').remove();
            
            if(id==0){
              sector.append('<option value="0">Seleccione</option>');
            }
  
            $(t).each(function(i,v){ //indice, Valor
              if(v.id == id) {
                sector.append('<option value="' + v.id + '" selected>' + v.nombre + '</option>');
              } else {
                sector.append('<option value="' + v.id + '">' + v.nombre + '</option>');
              }
            })
          },
          error: function() {
            alert('Error en el servidor al intentar llenar TipoDoc');
          }
        })
  
      }

})