<?php

namespace GCE\Controller;

use GCE\Model\Caracteristicas;

class CaracteristicasController
{

    private $model;

    public function __construct()
    {
        $this->model = new Caracteristicas();
    }

    /** Trae los registros de computadores */
    public function getAll()
    {
        $response = $this->model->get();
        echo json_encode($response);
    }

    /** Añade un registro a la tabla de características */
    public function addOne()
    {
        $this->model->gce_nombre_equipo = isset($_POST['gce_nombre_equipo']) ? $_POST['gce_nombre_equipo'] : null;
        $this->model->gce_procesador = isset($_POST['gce_procesador']) ? $_POST['gce_procesador'] : null;
        $this->model->gce_disco_duro = isset($_POST['gce_disco_duro']) ? $_POST['gce_disco_duro'] : null;
        $this->model->gce_pantalla = isset($_POST['gce_pantalla']) ? $_POST['gce_pantalla'] : null;
        $this->model->gce_grafica = isset($_POST['gce_grafica']) ? $_POST['gce_grafica'] : null;
        $this->model->gce_teclado = isset($_POST['gce_teclado']) ? $_POST['gce_teclado'] : null;
        $this->model->gce_estado = isset($_POST['gce_estado']) ? $_POST['gce_estado'] : null;
        $this->model->gce_board = isset($_POST['gce_board']) ? $_POST['gce_board'] : null;
        $this->model->gce_mouse = isset($_POST['gce_mouse']) ? $_POST['gce_mouse'] : null;
        $this->model->gce_case = isset($_POST['gce_case']) ? $_POST['gce_case'] : null;
        $this->model->gce_ram = isset($_POST['gce_ram']) ? $_POST['gce_ram'] : null;

        $response = $this->model->save();
        echo json_encode($response);
    }

    /** Trae un computador con base en su id */
    public function getOne()
    {
        $this->model->gce_id = isset($_GET['gce_id']) ? $_GET['gce_id'] : null;
        $response = $this->model->get();
        echo json_encode($response);
    }

}
