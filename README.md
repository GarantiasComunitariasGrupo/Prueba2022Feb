# Prueba para los aspirantes

El proyecto de gestión de equipos permite registrar y listar las características de los computadores de la compañía, es necesario añadir las siguientes funciones al proyecto:

* Aregar una opción en el listado para la actualización de cada uno de los computadores
* De acuerdo al formulario de registro, debe generar un formulario de actualización que reciba el identificador de un elemento seleccionado en la lista.
*	El formulario de actualización debe cargar automáticamente la información del computador seleccionado en un modal y cuando guarde, actualizar el registro en la tabla
*	Agregar una opción en el listado para el cambio de estado de los computadores
*	Agregar una regla de estilo a las filas con computadores inactivos, su color de fondo deberá ser rojo
*	Agregar una opción en el listado para la eliminación de cada uno de los computadores
*	Cuando se registran elementos debe añadir el registro nuevo a la tabla

### BD
Nombre: gc_equipos <br>
Tabla: gce_caracteristicas
* gce_id: Idetificación única del computador
* gce_nombre_equipo: Nombre del equipo
* gce_board: Tipo de placa base
* gce_case: Modelo de la torre
* gce_procesador: Marca del procesador
* gce_grafica: Marca de la trajeta gráfica
* gce_ram: Tamaño total de ram
* gce_disco_duro: Modelo del disco duro
* gce_teclado: Tipo de teclado
* gce_mouse: Tipo de mouse
* gce_pantalla: Tamaño total de la pantalla
* gce_estado: Estado del registro (0. Inactivo, 1. Activo)

#### BD Ubicación
L:\Andrés Ospina\Aspirantes <br>
gc_equipos_gce_caracteristicas.sql

#### Diseño
https://xd.adobe.com/view/abe67be2-dc70-489b-8cb3-dd24dc61f340-feb5/specs/

#### Instalación
cd C:\xampp\htdocs <br>
git clone https://github.com/aospinagcg/Prueba2022Feb.git Prueba2022 <br>
cd Prueba2022 <br>
composer install

#### Apertura
localhost/Prueba2022/view
