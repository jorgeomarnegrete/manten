
document.addEventListener("DOMContentLoaded", function() {

    
    
    window.onload = function() {
      document.getElementById("txtTitle").innerHTML="OT";
      
      const valores = window.location.search;
      const urlParams = new URLSearchParams(valores);
      var id = 0;
      var comando = urlParams.get('accion'); 
      if(comando=='agregar') {
        id=0;
      }else{
        id = urlParams.get('id');
      }

      switch(comando) {
        case 'agregar':
          $('#ConfirmarAgregar').show();
          $('#ConfirmarModificar').hide();
          $('#AdministrarTareas').hide();
          $('#AdministrarRepuestos').hide();
          $('#ImprimirOrden').hide();
          limpiarFormulario();
          llenarSectores(0);
          llenarTipos(0);
          llenarPersonal(0);
          llenarEstado(0);
          break;

        case 'modificar':
          //Recuperar Registro

      }
  

    }


    $('#ConfirmarAgregar').click(function() {
        let registro = recuperarDatosFormulario();
        agregarRegistro(registro);
        obtenerIdAgregado();
        id = $('#txtId').val();
        registro = recuperarRegistro(id);
    });

    $('#imprimirOrden').click(function() {

    })

    $('#ConfirmarModificar').click(function() {
        $("#FormularioDoc").modal('hide');
        let registro = recuperarDatosFormulario();
        modificarRegistro(registro);
    });


    $('#slcSector').change(function() {
      var sector = $('#slcSector').val();
      llenarMaquinaPorSector(0,sector);

    });

    $('#txtFecha').change(function() {
      var fecha = $('#txtFecha').val();
      llenaNumero(fecha);

    })


    //Funciones de manejo de formulario

    function limpiarFormulario(){
        $('#txtId').val('');
        $('#txtFecha').val('');
        $('#slcSector').val('');
        $('#txtNumero').val('');
        $('#txtNumero').attr('disabled', true);
        $('#slcMaquina').val('');
        $('#slcTipo').val('');
        $('#txtFalla').val('');
        $('#slcSolicita').val('');
        $('#slcEstado').val('');
    }

    function formReadOnly(ro){
      $('#txtFecha').attr('disabled', ro);
      $('#slcSector').attr('disabled', ro);
      $('#txtNumero').attr('disabled', ro);
      $('#slcMaquina').attr('disabled', ro);
      $('#slcTipo').attr('disabled', ro);
      $('#txtFalla').attr('disabled', ro);
      $('#slcSolicita').attr('disabled', ro);
      $('#slcEstado').attr('disabled', ro);
  }

    function recuperarDatosFormulario() {
        let registro = {
          id: $('#txtId').val(),
          numero: $('#txtNumero').val(),
          fecha: $('#txtFecha').val(),
          sector: $('#slcSector').val(),
          maquina: $('#slcMaquina').val(),
          tipo: $('#slcTipo').val(),
          falla: $('#txtFalla').val(),
          solicita: $('#slcSolicita').val(),
          estado: $('#slcEstado').val()
          };
        return registro;
    }


    //Funciones para comunicarse con la capa de datos en ajax
    function agregarRegistro(registro) {
        
        $.ajax({
          type: 'POST',
          url: 'data_ot.php?accion=agregar',
          data: registro,
          success: function(msg) {
            formReadOnly(true);
            $('#ConfirmarAgregar').hide();
            $('#ConfirmarModificar').show();
            $('#AdministrarTareas').show();
            $('#AdministrarRepuestos').show();
            $('#ImprimirOrden').show();
            
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
          url: 'data_ot.php?accion=consultar&id=' + id,
          data: '',
          success: function(datos) {
            $('#txtId').val(datos[0].id);
            $('#txtFecha').val(datos[0].fecha);
            llenarSectores(datos[0].sector);
            llenarTipos(datos[0].tipo);
            
          
          },
          error: function() {
            alert("Hay un problema al recuperar el registro");
          }
        });
    }

    function obtenerIdAgregado() {
        $.ajax({
          type: 'GET',
          url: 'data_ot.php?accion=getid',
          data: '',
          success: function(datos) {
            $('#txtId').val(datos[0].id);
          },
          error: function() {
            alert("Problemas al obtener el Id");
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
            alert('Error en el servidor al intentar llenar sectores');
          }
        })
  
    }

    function llenarMaquinaPorSector(id, sector) {
      var maquina = $("#slcMaquina");
      $.ajax({
        type: 'GET',
        url: 'data_maquinas.php?accion=porsector&sector=' + sector,
        data: '',
        success: function(t) {
          
          //Limpiamos el select
          maquina.find('option').remove();
          
          if(id==0){
            maquina.append('<option value="0">Seleccione</option>');
          }

          $(t).each(function(i,v){ //indice, Valor
            if(v.id == id) {
              maquina.append('<option value="' + v.id + '" selected>' + v.nombre + '</option>');
            } else {
              maquina.append('<option value="' + v.id + '">' + v.nombre + '</option>');
            }
          })
        },
        error: function() {
          alert('Error en el servidor al intentar llenar maquinas');
        }
      })

    }


    function llenaNumero(fecha) {
      var ano = fecha.substring(0,4);
      var mes = fecha.substring(5,7);
      var dia = fecha.substring(8,10);
      
      $.ajax({
        type: 'GET',
        url: 'data_ot.php?accion=numero&ano=' + ano + '&mes=' + mes + '&dia=' + dia,
        data: '',
        success: function(datos) {
          var orden = datos[0].nuevo.padStart(2,'0');
          var numero = '3-8' + mes + dia + orden
          $('#txtNumero').val(numero);
        },
        error: function() {
          alert("Hay un problema al recuperar el numero");
        }
      });

    }

    function llenarPersonal(id) {
      var solicita = $('#slcSolicita');
      $.ajax({
        type: 'GET',
        url: 'data_personal.php?accion=listar',
        data: '',
        success: function(t) {
          
          //Limpiamos el select
          solicita.find('option').remove();
          
          if(id==0){
            solicita.append('<option value="0">Seleccione</option>');
          }

          $(t).each(function(i,v){ //indice, Valor
            if(v.id == id) {
              solicita.append('<option value="' + v.id + '" selected>' + v.nombre + '</option>');
            } else {
              solicita.append('<option value="' + v.id + '">' + v.nombre + '</option>');
            }
          })
        },
        error: function() {
          alert('Error en el servidor al intentar llenar personal');
        }
      })
    }


    function llenarEstado(id) {
      var estado = $('#slcEstado');
      $.ajax({
        type: 'GET',
        url: 'data_estado.php?accion=listar',
        data: '',
        success: function(t) {
          
          //Limpiamos el select
          estado.find('option').remove();
          
          if(id==0){
            estado.append('<option value="0">Seleccione</option>');
          }

          $(t).each(function(i,v){ //indice, Valor
            if(v.id == id) {
              estado.append('<option value="' + v.id + '" selected>' + v.nombre + '</option>');
            } else {
              estado.append('<option value="' + v.id + '">' + v.nombre + '</option>');
            }
          })
        },
        error: function() {
          alert('Error en el servidor al intentar llenar Estados');
        }
      })
    }

    function llenarTipos(id) {
      var tipo = $('#slcTipo');
      $.ajax({
        type: 'GET',
        url: 'data_tipo.php?accion=listar',
        data: '',
        success: function(t) {
          
          //Limpiamos el select
          tipo.find('option').remove();
          
          if(id==0){
            tipo.append('<option value="0">Seleccione</option>');
          }

          $(t).each(function(i,v){ //indice, Valor
            if(v.id == id) {
              tipo.append('<option value="' + v.id + '" selected>' + v.nombre + '</option>');
            } else {
              tipo.append('<option value="' + v.id + '">' + v.nombre + '</option>');
            }
          })
        },
        error: function() {
          alert('Error en el servidor al intentar llenar Tipos');
        }
      })
    }


})