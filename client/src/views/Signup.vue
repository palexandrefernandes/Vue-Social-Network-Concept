<template>
    <div>
        <h2>Signup</h2>
        <b-form @submit="onSubmit">
            <b-form-group
                    id="input-group-4"
                    label="Name:"
                    label-for="input-4"
            >
                <b-form-input type="text" id="input-4" required placeholder="Name" v-model="name"/>
            </b-form-group>
            <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
            >
                <b-form-input type="email" id="input-1" required placeholder="Email" v-model="email" @change="verifyEmail"/>
            </b-form-group>
            <b-form-group
                    id="input-group-2"
                    label="Handle:"
                    label-for="input-2"
                    description="Identifier with 1 to 15 characters."
            >
                <b-form-input type="text" id="input-2" required placeholder="Handle" v-model="handle" @change="verifyHandle"/>
            </b-form-group>
            <b-form-group
                    id="input-group-3"
                    label="Password:"
                    label-for="input-3"
            >
                <b-form-input type="password" id="input-3" required placeholder="Password" v-model="password"/>
            </b-form-group>
            <b-alert variant="danger" v-model="showError">{{errorMessage}}</b-alert>
            <b-button type="submit" variant="primary">Signup</b-button>
        </b-form>
    </div>
</template>

<script>
    import Axios from 'axios';

    export default {
        name: "Signup",
        data() {
            return {
                email: "",
                password: "",
                name: "",
                handle: "",
                showError: false,
                errorMessage: "Something went wrong creating a new account!"
            };
        },
        mounted() {
            if(this.$store.getters.getToken != "")
                this.$router.push('/feed');
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                Axios.post(process.env.VUE_APP_BASE_URL + '/auth/signup', {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    handle: this.handle
                })
                    .then(res => {
                        this.showError = false;
                        this.$router.push("/login");
                    })
                    .catch(err => {
                        this.showError = true;
                        this.errorMessage = "Something went wrong creating a new account!";
                    });

            },
            verifyEmail(evt) {
                Axios.post(process.env.VUE_APP_BASE_URL + '/auth/email', {
                    email: this.email,
                })
                    .then(res => {
                        this.showError = false;
                    })
                    .catch(err => {
                        this.showError = true;
                        this.errorMessage = "Email already in use";
                    });
            },
            verifyHandle(evt) {
                Axios.post(process.env.VUE_APP_BASE_URL + '/auth/handle', {
                    handle: this.handle,
                })
                    .then(res => {
                        this.showError = false;
                    })
                    .catch(err => {
                        this.showError = true;
                        this.errorMessage = "Handle already in use!";
                    });
            }
        }

    }
</script>

<style scoped>

</style>