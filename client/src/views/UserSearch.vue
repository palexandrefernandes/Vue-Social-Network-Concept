<template>
    <div>
        <b-form-group label="Search" description="Search by user name or handle" for="search">
            <b-input @change="search" type="text" v-model="query"/>
        </b-form-group>
        <div class="results" v-show="query.length > 0">
            <h4>Results:</h4>
            <user-description class="user-description" v-for="user in users" :user="user" user-id="1"></user-description>
        </div>
    </div>
</template>

<script>
    import UserDescription from "../components/UserDescription";
    import Axios from 'axios';

    export default {
        name: "UserSearch",
        components: {UserDescription},
        data() {
            return {
                query: "",
                users: null
            }
        },
        mounted() {
            if(this.$store.getters.getToken == "")
                this.$router.push('/login');
        },
        methods: {
            search(){
                Axios.get(process.env.VUE_APP_BASE_URL + `/user/search/${this.query}`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.users = res.data.data;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            }

        }
    }
</script>

<style scoped>
    .user-description{

    }
</style>