<template>
    <div>
        <h2>Login</h2>
        <b-form @submit="onSubmit">
            <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
            >
                <b-form-input id="input-1" v-model="email" type="email" required placeholder="Enter your email"/>
            </b-form-group>
            <b-form-group
                    id="input-group-2"
                    label="Password:"
                    label-for="input-2"
            >
                <b-form-input id="input-2" v-model="password" type="password" required/>
            </b-form-group>
            <b-alert variant="danger" v-model="error">The credentials inserted don't match!</b-alert>
            <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
    </div>
</template>

<script>
    import Axios from 'axios';

    export default {
        name: 'login',
        data() {
            return {
                email: "",
                password: "",
                error: false
            };
        },
        mounted() {
            if(this.$store.getters.getToken != "")
                this.$router.push('/feed');
        },
        methods: {
            onSubmit: function (env) {
                env.preventDefault();
                Axios.post(process.env.VUE_APP_BASE_URL + '/auth/token', {email: this.email, password: this.password})
                    .then(res => {
                        this.$store.dispatch('login', res.data.success.token);
                        this.$router.push("/feed");
                    })
                    .catch(err => {
                        console.log(err.response.data.error);
                        this.error = true;
                    });

            }
        },
        computed: {
            getTokenTest() {
                return this.$store.getters.getToken;
            }
        }
    }
</script>
