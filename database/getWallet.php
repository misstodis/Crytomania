<?php
include_once('connectDb.php');
$conn = databaseConnect();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $userId = $_GET['user']['id'];

    $sql = "SELECT * FROM coinwallet WHERE user = '$userId'";
    $query = mysqli_query($conn, $sql) or die(mysqli_error($conn));

    $result = $query->fetch_all(MYSQLI_ASSOC);

    echo json_encode($result);
}
