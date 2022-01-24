// @ts-check

/** @template T @typedef { import('../../assets/js/request.js').DataType<T> } DataType */
import { ApiRequest } from "../../assets/js/request.js";

/**
 * @typedef {object} Caracteristicas Composición del computador
 * @property {string | number} gce_id Idetificación única del computador
 * @property {string} gce_nombre_equipo Nombre del equipo
 * @property {string} gce_board Tipo de placa base
 * @property {string} gce_case Modelo de la torre
 * @property {string} gce_procesador Marca del procesador
 * @property {string} gce_grafica Marca de la trajeta gráfica
 * @property {string} gce_ram Tamaño total de ram
 * @property {string} gce_disco_duro Modelo del disco duro
 * @property {string} gce_teclado Tipo de teclado
 * @property {string} gce_mouse Tipo de mouse
 * @property {string} gce_pantalla Tamaño total de la pantalla
 * @property {string | number} gce_estado Estado del registro
 */

/** Clase que representa al componente computador */
class Computador {

  /** @type {(keyof Caracteristicas)[]} Listado de campos de la tabla de computadores */
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
    ApiRequest.get('Caracteristicas', 'getAll').then(/** @param {DataType<Caracteristicas[]>} response */response => {
      /** @type {HTMLElement} Referencia del cuerpo de la tabla */
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

  /** 
   * Registra un computador en la base de datos 
   * @param {SubmitEvent} event Evento submit del formulario
   */
  static add = (event) => {
    event.preventDefault(); // Cancela el restablecimiento de la página

    /** Formulario de registro */
    const registerForm =  /** @type {HTMLFormElement} */ (event.target);

    /** @type {Partial<Record<keyof Caracteristicas, string>>} */
    const parameters = {};

    this.columnList.forEach(columnName => {
      if (columnName !== 'gce_id') {
        /** @type {HTMLInputElement | HTMLSelectElement} */
        const input = registerForm.querySelector(`[name="${columnName}"]`);
        parameters[columnName] = input?.value;
      }
    });

    ApiRequest.post('Caracteristicas', 'addOne', parameters).then(/** @param {DataType<Caracteristicas[]>} response */(response) => {
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