<div id="carouselExampleCaptions" class="carousel slide mt-4" data-bs-ride="carousel">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner " id="js-three-news-slide-content">

    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>

<template id="js-three-news-slide-info" type=" text/mustache">
    {{ #data }}
    <div class="carousel-item {{ #isActive }}{{  isActive  }}{{ /isActive }}">
        {{ #image_url }}
        <a href="{{ link }}">
            <img src="{{ image_url }}" class="d-block w-100" style="height: 600px;" alt="...">
        </a>
        {{ /image_url }}

        {{ ^image_url }}
        <a href="{{ link }}">
            <img src="https://play-lh.googleusercontent.com/1F0mOUKA4iU5l6HZliXZnzfWGnxBqmMPs2L5Kiq1j9_IoFxZ198NulqckvyBhnYNGew" style="height: 600px;" class="d-block w-100" alt="...">
        </a>
        {{ /image_url }}

        <div class="carousel-caption d-none d-md-block bg-dark">
            <h5>{{ title }}</h5>
            <p>Authour: {{ creator }}.</p>
        </div>
    </div>
    {{ /data }}
</template>