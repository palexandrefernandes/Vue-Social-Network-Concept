<template>
    <div class="container-fluid">
        <div>
            <b-form @submit="onSubmit">
                <b-form-input v-model="email"  type="text" required placeholder="Enter your email"/>
                <b-form-input v-model="password" type="password" required/>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </div>
        {{ getTokenTest }}
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
                email:"",
                password:"",
            };
        },
        methods:{
            onSubmit: function (env) {
                env.preventDefault();
                Axios.post(process.env.VUE_APP_BASE_URL + '/auth/token', {email: this.email, password: this.password})
                    .then(res => {
                        //this.$cookies.set('auth-token', res.data.success.token_type + ' ' + res.data.success.token);
                        this.$store.dispatch('login', res.data.success.token);
                    })
                    .catch(err => {
                        console.log(err.response.data.error);
                    });

            }
        },
        computed:{
            getTokenTest(){
                return this.$store.getters.getToken;
            }
        }
    }
</script>
