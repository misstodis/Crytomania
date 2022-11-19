<?php

include_once('connectDb.php');

if (isset($_POST['user'])) {
    $conn = databaseConnect();

    // get post from ajax request
    $user  = $_POST['user'];

    $name = $user['name'];
    $password = $user['password'];

    $sql = "SELECT * FROM users WHERE name = '$name'";
    $query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
    //check of user already exists in database

    $usedName = mysqli_num_rows($query);


    if ($usedName > 0) {
        $data = mysqli_fetch_assoc($query);

        $checkpass = password_verify($password, $data['password']);


        echo  $checkpass  ? json_encode($data = [...$data, 'success' => true]) : json_encode($response = ["error" => 'wrong password']);
    } else {
        $response = ["error" => "user not found"];

        echo json_encode($response);
    }
}
