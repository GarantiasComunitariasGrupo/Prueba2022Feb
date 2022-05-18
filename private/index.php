<?php

require '../vendor/autoload.php';

header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Origin: *"); // Permite acceso.

class Index
{

    public function __construct(string $url)
    {
        if (isset($url)) {
            $split = explode("/", $url);
            $file = isset($split[0]) ? $split[0] : null;
            $method = isset($split[1]) ? $this->renameMethod($split[1]) : null;
            $params = array_slice($split, 2);
            // Verifica que el archivo del controlador exista
            if ($file !== null && file_exists("Controller/" . ucfirst($file) . "Controller.php")) {
                // Genera el namespace
                $reference = "\\GCE\\Controller\\" . ucfirst($file) . 'Controller';
                // Instancia el contolador
                $controller = new $reference();
                // Verifica que el méotodo solicitado exista
                if (method_exists($controller, $method) && is_callable([$controller, $method])) {
                    // Verifica si tiene parámetros
                    if (!empty($params)) {
                        call_user_func(array($controller, $method), json_encode($params));
                    } else {
                        $controller->{$method}();
                    }
                } else {echo "ruta incorrecta";}
            } else {echo "ruta incorrecta";}
        }
    }

    public function renameMethod($name)
    {
        $slice = explode("-", $name);
        $renamed = array_reduce($slice, function ($prev, $curr) {
            return $prev . ucfirst($curr);
        });
        return lcfirst($renamed);
    }

}
new Index($_GET['url']);
