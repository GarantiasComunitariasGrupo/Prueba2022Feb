<?php

namespace GCE\Config;

use Throwable;
use Exception;
use PDO;

class Connection
{

    public $DB;

    public function __construct()
    {
        try {
            $connection = (object) ["dsn" => "mysql:dbname=gc_equipos;host=localhost", "user" => "root", "password" => ""];
            $this->DB = new PDO($connection->dsn, $connection->user, $connection->password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        } catch (\Throwable $th) {
            throw new Exception("Falla la conexión a BD: " . $th->getMessage(), 1);
        }
    }

}
