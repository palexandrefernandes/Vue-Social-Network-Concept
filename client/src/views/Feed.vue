<template>
    <div>
        <div v-if="posts.length > 0">
            <Post v-for="p in posts" :post="p" user-id="1" show-user-info/>
        </div>
        <div v-else>
            <p class="text-center">There is nothing your feed yet!</p>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import Post from "../components/Post";

    export default {
        name: "Feed",
        components: {Post},
        data(){
            return {
                posts: []
            };
        },
        mounted() {
            if(this.$store.getters.getToken == "")
                this.$router.push('/login');
            this.loadFeed();
        },
        methods:{
            loadFeed(){
                Axios.get(process.env.VUE_APP_BASE_URL + `/posts/feed`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.posts = this.posts.concat(res.data.data);
                        console.log(this.posts);
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            }
        }
    }
</script>

<style scoped>

</style>