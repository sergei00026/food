<?php
// Код чтобы на php получить данные и с ними работать!
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);