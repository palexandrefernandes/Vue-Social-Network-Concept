<template>
    <div v-show="name.length > 0">
        <b-form @submit="onSumbit">
            <b-form-group label="Name" description="Your name" label-for="input-1">
                <b-input type="text" required v-model="name" id="input-1" required/>
            </b-form-group>
            <b-form-group label="Description" description="Your account description" label-for="input-2">
                <b-textarea v-model="description" rows="3" max-rows="10" id="input-2"/>
            </b-form-group>

            <b-form-group label="Profile picture" description="image/jpeg, image/png, image/gif" label-for="input-3">
                <b-form-file
                        id="input-3"
                        v-model="image"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        accept="image/jpeg, image/png, image/gif"
                />
            </b-form-group>
            <b-form-group label-for="checkbox-1" label="Account" description="Checking this will make your account content visible to everyone and automatically accept any follow request">
                <b-form-checkbox
                        id="checkbox-1"
                        v-model="status"
                        name="checkbox-1"
                        value="y"
                        unchecked-value="n"
                >
                    Public Account
                </b-form-checkbox>
            </b-form-group>
            <b-button type="submit" variant="primary">Save</b-button>
        </b-form>
    </div>

</template>

<script>
    import Axios from "axios";
    import jwt from "jsonwebtoken";

    export default {
        name: "EditAccount",
        data() {
            return {
                name: "",
                description: "",
                image: null,
                status: ''
            };
        },
        mounted() {
            if (this.$store.getters.getToken == "")
                this.$router.push('/login');
            this.getUserInfo();
        },
        methods: {
            getUserInfo() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/user/${jwt.decode(this.$store.getters.getToken).id}`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.name = res.data.data.name;
                        this.description = res.data.data.description;
                        if(res.data.data.public){
                            this.status = 'y';
                        }
                        else{
                            this.status = 'n';
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            },
            onSumbit(evt) {
                evt.preventDefault();
                let fd = new FormData();
                if (this.image !== null) {
                    fd.append('image', this.image);
                }
                if (this.description !== "") {
                    fd.append('description', this.description);
                }
                fd.append('name', this.name);

                if(this.status === 'y'){
                    fd.append('public', "1");
                }

                Axios.put(process.env.VUE_APP_BASE_URL + `/user/`, fd, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        console.log('user updated');
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