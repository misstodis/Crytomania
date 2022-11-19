<?php

function databaseConnect()
{
    // $dbhost = "localhost";
    // $dbuser = "root";
    // $dbpass = "123";
    // $dbname = "crypto_mania";


    $dbhost = "sql206.epizy.com";
    $dbuser = "epiz_33034405";
    $dbpass = "XeWJbI3oup0";
    $dbname = "epiz_33034405_crypto_mania";

    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);


    if (!$conn) {
        // warning the connection with database en show errors for database
        echo "can't connect to database" . mysqli_connect_error();
    }

    return $conn;
}
