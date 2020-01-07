<template>
    <div>
        <h2>Pending Follow Requests:</h2>
        <div v-if="follows">
            <follow-request v-for="follow in follows" :follow="follow"/>
        </div>
        <div v-else>
            <h4 class="text-center">No pending follow requests!</h4>
        </div>
    </div>
</template>

<script>
    import FollowRequest from "../components/FollowRequest";
    import Axios from 'axios';

    export default {
        name: "FollowRequests",
        components: {FollowRequest},
        data() {
            return {
                follows: null
            };
        },
        mounted() {
            if(this.$store.getters.getToken == "")
                this.$router.push('/login');
            this.getFollowRequests();
        },
        methods: {
            getFollowRequests() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/requests`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.follows = res.data.data;
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