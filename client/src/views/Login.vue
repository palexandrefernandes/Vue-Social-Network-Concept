<template>
    <div>
        <h2>Login</h2>
        <b-form @submit="onSubmit">
            <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
            >
                <b-form-input id="input-1" v-model="email" type="text" required placeholder="Enter your email"/>
            </b-form-group>
            <b-form-group
                    id="input-group-2"
                    label="Password:"
                    label-for="input-2"
            >
                <b-form-input id="input-2" v-model="password" type="password" required/>
            </b-form-group>
            <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue';
    import Axios from 'axios';

    export default {
        name: 'login',
        data() {
            return {
                email: "",
                password: "",
            };
        },
        methods: {
            onSubmit: function (env) {
                env.preventDefault();
                Axios.post(process.env.VUE_APP_BASE_URL + '/auth/token', {email: this.email, password: this.password})
                    .then(res => {
                        this.$store.dispatch('login', res.data.success.token);
                        //this.$router.push("");
                    })
                    .catch(err => {
                        console.log(err.response.data.error);
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
