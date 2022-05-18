// @ts-check

/** 
 * @template T
 * @typedef {{ data: T; response: boolean; status: number; }} DataType
 */

/** Clase que permite hacer peticiones al api */
class ApiRequest {
  /** Ruta del api */
  static apiPath = '/Prueba2022/private/';

  constructor() { }

  /** Petición de tipo POST al api 
   * @param {string} contoller Nombre del controlador del api sin la palabra clave Controller (Puede ser escrito en PascalCase o kebab-case)
   * @param {string} action Nombre del método del controlador del api a ejecutar (Puede ser escrito en camelCase o kebab-case)
   * @param {Record<string, any>} parameters Parámetros 
   * @returns {Promise<DataType<any>>} Retorno del servicio
  */
  static post(contoller, action, parameters = {}) {
    return this.request('POST', contoller, action, parameters);
  }

  /**
   * Petición de tipo GET al api
   * @param {string} contoller Nombre del controlador del api sin la palabra clave Controller (Puede ser escrito en PascalCase o kebab-case)
   * @param {string} action Nombre del método del controlador del api a ejecutar (Puede ser escrito en camelCase o kebab-case)
   * @param {string} parameters Parámetros de URL
   * @example ?param1=val&param2=val
   * @returns {Promise<DataType<any>>} Retorno del servicio
   */
  static get(contoller, action, parameters = '') {
    return this.request('GET', contoller, action, parameters);
  }

  /**
   * Método que hace peticiones al backend de GCEquipos
   * @private
   * @param {'POST'|'GET'} action Método que recibe el servicio {POST | GET}
   * @param {string} controller Nombre del controlador del api sin la palabra clave Controller (Puede ser escrito en PascalCase o kebab-case)
   * @param {string} method Nombre del método del controlador del api a ejecutar (Puede ser escrito en PascalCase o kebab-case)
   * @param {Record<string, any> | string} parameters Paramétros
   * @returns {Promise<DataType<any>>} Retorno del servicio
   */
  static request(action, controller, method, parameters = {}) {
    return new Promise((resolve, reject) => {
      /** Ruta del servicio */
      const url = `${this.apiPath}${controller}/${method}${typeof parameters === 'string' ? parameters : ''}`;
      /** Solicitud HTTP */
      const http = new XMLHttpRequest();
      http.responseType = 'json';

      http.open(action, url);
      http.onreadystatechange = () => http.readyState === 4 && (http.status === 200 ? resolve(http.response) : reject(http));

      if (typeof parameters === 'object') { // Peticion POST
        /** Parámetros del formulario */
        const request = Object.entries(parameters).reduce((form, [key, value]) => (form.append(key, value), form), new FormData());
        http.send(request);
      } else if (typeof parameters === 'string') { // Peticion GET
        http.send();
      } else { // Formato no permitido
        console.error(`El parámetro {parameters} recibe ${action === 'POST' ? 'un objeto' : 'una cadena de texto'}`);
      }

    });
  }

};

export { ApiRequest };
