<?php

namespace GCE\Model;

use GCE\Config\Connection;
use PDO;

class Caracteristicas extends Connection
{

    public $fields = ["gce_id", "gce_nombre_equipo", "gce_board", "gce_case", "gce_procesador", "gce_grafica", "gce_ram", "gce_disco_duro", "gce_teclado", "gce_mouse", "gce_pantalla", "gce_estado", "gce_caracteristicas"];

    public $gce_nombre_equipo = null;
    public $gce_procesador = null;
    public $gce_disco_duro = null;
    public $gce_pantalla = null;
    public $gce_grafica = null;
    public $gce_teclado = null;
    public $gce_estado = null;
    public $gce_board = null;
    public $gce_mouse = null;
    public $gce_case = null;
    public $gce_ram = null;
    public $gce_id = null;

    /** Devuelve los registros de la tabla de características */
    public function get()
    {
        // Código de consulta
        $query = "SELECT `gce_caracteristicas`.`gce_id`,
            `gce_caracteristicas`.`gce_nombre_equipo`,
            `gce_caracteristicas`.`gce_board`,
            `gce_caracteristicas`.`gce_case`,
            `gce_caracteristicas`.`gce_procesador`,
            `gce_caracteristicas`.`gce_grafica`,
            `gce_caracteristicas`.`gce_ram`,
            `gce_caracteristicas`.`gce_disco_duro`,
            `gce_caracteristicas`.`gce_teclado`,
            `gce_caracteristicas`.`gce_mouse`,
            `gce_caracteristicas`.`gce_pantalla`,
            `gce_caracteristicas`.`gce_estado`
        FROM `gc_equipos`.`gce_caracteristicas`";

        /** Filtra si alguna de las variables tiene información */
        if (!empty($this->gce_id) || !empty($this->gce_estado)) {
            $query .= " WHERE ";

            if (!empty($this->gce_id)) {
                $query .= "`gce_caracteristicas`.`gce_id` = :gce_id";
                $query .= " AND ";
            }

            if (!empty($this->gce_estado)) {
                $query .= "`gce_caracteristicas`.`gce_estado` = :gce_estado";
                $query .= " AND ";
            }

            $query = substr($query, 0, strlen($query) - 5); // Elimina el último AND
        }

        // Prepara la sentencia
        $sql = $this->DB->prepare($query);

        // Añade los valores
        if (!empty($this->gce_id) || !empty($this->gce_estado)) {
            if (!empty($this->gce_id)) {
                $sql->bindValue(":gce_id", $this->gce_id, PDO::PARAM_INT);
            }
            if (!empty($this->gce_estado)) {
                $sql->bindValue(":gce_estado", $this->gce_estado, PDO::PARAM_STR);
            }
        }

        // Ejecuta la consulta
        try {
            $sql->execute();
            $this->clear();
            return ["status" => 200, "response" => true, "data" => $sql->fetchAll(PDO::FETCH_ASSOC)];
        } catch (\Throwable $th) {
            return ["status" => 200, "response" => false, "message" => 'No es posible consultar los registros: ' . $th->getMessage()];
        }
    }

    /** Guarda registros en la tabla de características */
    public function save()
    {
        // Código de inserción
        $query = "INSERT INTO `gc_equipos`.`gce_caracteristicas`
        (`gce_nombre_equipo`, `gce_board`, `gce_case`, `gce_procesador`, `gce_grafica`, `gce_ram`, `gce_disco_duro`, `gce_teclado`, `gce_mouse`, `gce_pantalla`, `gce_estado`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        // Prepara la sentencia
        $sql = $this->DB->prepare($query);
        // Asigna los parámetros
        $sql->bindParam(1, $this->gce_nombre_equipo, PDO::PARAM_STR, 255);
        $sql->bindParam(2, $this->gce_board, PDO::PARAM_STR, 255);
        $sql->bindParam(3, $this->gce_case, PDO::PARAM_STR, 255);
        $sql->bindParam(4, $this->gce_procesador, PDO::PARAM_STR, 255);
        $sql->bindParam(5, $this->gce_grafica, PDO::PARAM_STR, 255);
        $sql->bindParam(6, $this->gce_ram, PDO::PARAM_STR, 255);
        $sql->bindParam(7, $this->gce_disco_duro, PDO::PARAM_STR, 255);
        $sql->bindParam(8, $this->gce_teclado, PDO::PARAM_STR, 255);
        $sql->bindParam(9, $this->gce_mouse, PDO::PARAM_STR, 255);
        $sql->bindParam(10, $this->gce_pantalla, PDO::PARAM_STR, 255);
        $sql->bindParam(11, $this->gce_estado, PDO::PARAM_STR, 2);

        // Ejecuta la consulta
        try {
            $sql->execute();
            $this->clear();
            // Devuelve el registro insertado
            $this->gce_id = $this->DB->lastInsertId();
            return $this->get();
        } catch (\Throwable $th) {
            return ["status" => 200, "response" => false, "message" => 'No es posible insertar el registro: ' . $th->getMessage()];
        }
    }

    /** Limpia los valores del modelo */
    private function clear()
    {
        $this->gce_nombre_equipo = null;
        $this->gce_procesador = null;
        $this->gce_disco_duro = null;
        $this->gce_pantalla = null;
        $this->gce_grafica = null;
        $this->gce_teclado = null;
        $this->gce_estado = null;
        $this->gce_board = null;
        $this->gce_mouse = null;
        $this->gce_case = null;
        $this->gce_ram = null;
        $this->gce_id = null;
    }

}
