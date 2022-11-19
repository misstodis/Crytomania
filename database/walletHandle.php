<?php

include_once("./connectDb.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = $_POST["data"];
    $action = $data["action"];

    if ($action == 'delete') {
        $coinId = $data["coinId"];
        $userId = $data["userId"];
        deleteCoin($coinId, $userId);
    }
    if ($action == 'update') {
        $amountCoin = $data["amountCoin"];
        $amountMoney = $data["amountMoney"];
        $coinId = $data["coinId"];
        $userId = $data["userId"];
        editCoin($coinId, $userId, $amountCoin, $amountMoney);
    }
}


function deleteCoin($coinId, $userId)
{
    $conn = databaseConnect();
    $sql = "DELETE FROM `coinwallet` WHERE id = '$coinId' AND user = '$userId'";
    $query = $conn->query($sql);

    if ($query) {
        echo json_encode($query);
    } else {
        echo  mysqli_error($conn);
    }
}


function editCoin($coinId, $userId, $amountCoin, $amountMoney)
{
    $conn = databaseConnect();
    $sql = "UPDATE `coinwallet` SET `totalCoin`=' $amountCoin',`totalMoney`='$amountMoney' WHERE  `id` = '$coinId' AND user = '$userId'";
    $query = $conn->query($sql);

    if ($query) {
        echo json_encode($query);
    } else {
        echo  mysqli_error($conn);
    }
}
