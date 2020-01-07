<template>
    <div>
        <div class="hero">
            <div class="">
                <div>
                    <img class="hero-image" src="../assets/ricebowl.png"/>
                    <h1 class="text-center">Rice Bowl</h1>
                    <h3 class="text-center">Image Sharing Social Network</h3>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row cards">
                <div class="col-md-4">
                    <div class="card-content ">
                        <v-icon name="search"></v-icon>
                        <h4>Find Friends</h4>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card-content">
                        <v-icon name="images"></v-icon>
                        <h4>Share Images</h4>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card-content">
                        <v-icon name="users"></v-icon>
                        <h4>Interact</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index"
    }
</script>

<style scoped>
    .hero {
        background: rgb(23, 162, 184);
        background: linear-gradient(180deg, rgba(23, 162, 184, 1) 0%, rgba(23, 162, 184, 1) 16%, rgba(70, 205, 227, 1) 100%);
        color: white;
        padding-bottom: 40px;
    }

    .hero-image {
        max-height: 40vh;
        min-height: 40vh;
        margin: 0 auto;
        display: block;
    }

    .cards{
        margin-top: 50px;
    }

    .card-content {
        text-align: center;
        border-radius: 5px;
        border: 1px solid #EEE;
        padding: 50px;
        color: rgb(23, 162, 184);
        -webkit-box-shadow: 0px 14px 74px -28px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: 0px 14px 74px -28px rgba(0, 0, 0, 0.05);
        box-shadow: 0px 14px 74px -28px rgba(0, 0, 0, 0.05);
    }

    .card-content>svg{
        width: 10vmin;
        height: 10vmin;
        margin-bottom: 20px;
    }
</style>