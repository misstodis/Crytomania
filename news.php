<?php
include_once("./views/head.php");

include_once("./views/slider/sliderNews.php");
?>

<h1 class="mt-4 mb-0">News</h1>
<hr />
<div class="row mb-2 mt-1" id="js-news-content">

</div>

<template id="js-news-info" type=" text/mustache">
    {{ #results }}
    <div class="col-md-12 animate__animated animate__slideInUp">
        <div class="card flex-md-row mb-4 box-shadow h-md-250">
            <div class="card-body d-flex flex-column align-items-start">
                <strong class="d-inline-block mb-2 text-success">{{ source_id }}</strong>
                <h3 class="mb-0">
                    <a class="text-dark" href="{{ link }}">{{ title }}</a>
                </h3>
                <div class="mb-1 text-muted">{{ pubDate }}</div>
                <p class="card-text mb-auto">{{ description }}</p>
                <a href="{{ link }}">Continue reading</a>
            </div>
            <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" style="width: 200px; height: 250px;" src="{{ image_url }}" data-holder-rendered="true">
        </div>
    </div>
    {{ /results }}
</template>

<script type="module" src="./js/cryptoNews.js"></script>

<?php
include_once("./views/footer.php");
