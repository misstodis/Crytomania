<?php

function databaseConnect()
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "123";
    $dbname = "crypto_mania";

    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);


    if (!$conn) {
        // warning the connection with database en show errors for database
        echo "can't connect to database" . mysqli_connect_error();
    }

    return $conn;
}
