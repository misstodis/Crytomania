<?php
include_once('connectDb.php');


/**
 * check exist coin in user wallet
 * if exist then update 
 *  else import an new coin
 */
$conn = databaseConnect();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if ($_POST['data']) {

        //get data from ajax
        $data = $_POST["data"];

        $userId = $data["userId"];
        $userName  = $data["userName"];
        $amountCoin = $data["amountCoin"];
        $amonuntMoney = $data["amountMoney"];
        $coinName = $data["coinName"];
        $coinSymbol = $data["coinSymbol"];
        $coinImage  = $data["coinImage"];


        //set querry send to database
        $sql = "SELECT * FROM coinwallet WHERE user = '$userId' AND coinSymbol = '$coinSymbol' ";
        $query = mysqli_query($conn, $sql) or die(mysqli_error($conn));

        $existUserCoin = mysqli_fetch_assoc($query);

        //if coin already exist in user wallet then update it
        if (!empty($existUserCoin)) {
            $newAmountCoin =  $existUserCoin['totalCoin'] + $amountCoin;
            $newTotalMoney =  $existUserCoin['totalMoney'] + $amonuntMoney;

            $updateSql = "UPDATE `coinwallet` SET `totalCoin` = '$newAmountCoin',`totalMoney`= '$newTotalMoney' WHERE user = '$userId'  AND `coinSymbol` = '$coinSymbol' ";

            $query = mysqli_query($conn, $updateSql) or die(mysqli_error($conn));
            if ($query) {
                echo json_encode($query);
            }
        } else {
            // if coin not exist in user wallet
            $insertSql = "INSERT INTO `coinwallet`(`coinName`, `coinSymbol`, `coinImage`, `totalCoin`, `totalMoney`, `user`) VALUES ('$coinName','$coinSymbol','$coinImage','$amountCoin','$amonuntMoney','$userId')";
            $query = mysqli_query($conn, $insertSql) or die(mysqli_error($conn));
            if ($query) {
                echo json_encode($query);
            }
        }
    }
}
