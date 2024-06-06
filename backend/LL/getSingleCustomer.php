<?php
include "configuration.php";

$data = array ();

$q = mysqli_query($conn , "SELECT name, surname, username, email, contact, password, conpassword FROM `customers`");

while($row = mysqli_fetch_object($q)){
    $data[] = $row;

}

echo json_encode($data);
echo mysqli_error($conn);


?>