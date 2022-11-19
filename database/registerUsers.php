<?php

include_once('connectDb.php');


function checkExistUser($userName)
{
    $conn = databaseConnect();

    $sql = " SELECT * FROM `users` WHERE name = '$userName'";
    $query = mysqli_query($conn, $sql) or die(mysqli_error($conn));

    //check of user already exists in database
    $usedName = mysqli_num_rows($query);

    return $usedName ?  true :  false;
}

//check POST user through ajax
if (isset($_POST['user'])) {
    $conn = databaseConnect();
    $row = [];

    // get associative array php
    $user  = $_POST['user'];
    // get element in array
    $name = $user['name'];
    $password = $user['password'];
    $confirmPassword = $user['password-confirmation'];

    $existUer =  checkExistUser($name);

    if ($existUer) {
        echo $existUer;
    } else {
        if ($password == $confirmPassword) {
            //encrypte password voor secure
            $encryptPassword = password_hash($password, PASSWORD_DEFAULT);
            // code voor database sql
            $sql = " INSERT INTO users(name,password) VALUES('$name','$encryptPassword')";
            $query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
        }
        $rel = ['message' => "created user" . $name . " successfully"];
        echo json_encode($rel);
    }
}
