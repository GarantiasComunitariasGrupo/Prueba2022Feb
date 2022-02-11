import { ApiRequest } from "../../assets/js/request.js";

/** Clase que representa al componente computador */
class Computador {

  /** Listado de campos de la tabla de computadores */
  static columnList = [
    'gce_nombre_equipo',
    'gce_board',
    'gce_case',
    'gce_procesador',
    'gce_grafica',
    'gce_ram',
    'gce_disco_duro',
    'gce_teclado',
    'gce_mouse',
    'gce_pantalla',
    'gce_estado',
    'gce_id'
  ]

  constructor() { }

  /** Actualiza el listado de computadores en la tabla */
  static get() {
    ApiRequest.get('Caracteristicas', 'getAll').then(response => {
      /** Referencia del cuerpo de la tabla */
      const tbody = document.querySelector('#list-table tbody');
      tbody.innerHTML = ''; // Limpia la tabla

      response.data.forEach(item => { // Ingresa los registros en la tabla
        let row = '<tr>'; // Crea la fila

        this.columnList.forEach(columnName => {
          if (columnName !== 'gce_id') { // El id es autoincrementable para el registro
            let column = '<td>'; // Crea la columna
            switch (columnName) { // Añade el texto a la columna
              case 'gce_estado': column += (+item[columnName] === 1 ? 'Activo' : 'Inactivo'); break;
              default: column += item[columnName]; break;
            }
            column += '</td>';
            row += column; // Añade la columna a la fila
          }
        });

        row += '</tr>';
        tbody.innerHTML += row; // Añade la fila a la tabla
      });
    }).catch(error => console.log('Ha ocurrido un error', error));
  }

  /** Registra un computador en la base de datos */
  static add = (event) => {
    event.preventDefault(); // Cancela el restablecimiento de la página

    /** Formulario de registro */
    const registerForm = event.target;

    const parameters = {};

    this.columnList.forEach(columnName => {
      if (columnName !== 'gce_id') {
        const input = registerForm.querySelector(`[name="${columnName}"]`);
        parameters[columnName] = input?.value;
      }
    });

    ApiRequest.post('Caracteristicas', 'addOne', parameters).then((response) => {
      console.log('Añadir', response, response.data);
    }).catch(error => console.log('Ha ocurrido un error', error));
  };

}

// Evento que espera a que cargue el contenido HTML 
document.addEventListener('DOMContentLoaded', () => {
  Computador.get(); // Actualiza la tabla de computadores
});


(function () { // Habilita el uso de las clases en el archivo HTML
  this.Computador = Computador;
  this.ApiRequest = ApiRequest;
}).apply(window);