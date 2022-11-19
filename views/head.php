<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ctyto Mania</title>

    <!-- icon bootrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <!-- bootrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <!-- animation -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <!-- custom css -->
    <link rel="stylesheet" href="./css/styles.css">



</head>

<body class="d-flex flex-column min-vh-100">

    <?php
    include_once("navbar.php");

    // include login modal
    include_once("./views/Modal/modalLogin.php");

    // include signup modal
    include_once("./views/Modal/modalSignup.php");
    ?>

    <div class="container cointainer-custon">