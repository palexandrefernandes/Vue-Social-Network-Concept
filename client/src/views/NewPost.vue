<template>
    <div>
        <h2>New Post</h2>
        <b-form @submit="onSubmit">
            <b-form-group
                    id="input-group-1"
                    label="Title:"
                    label-for="input-1"
            >
                <b-form-input id="input-1" v-model="title" type="text" required placeholder="Post title"/>
            </b-form-group>
            <b-form-group
                    id="input-group-2"
                    label="Description"
                    label-for="input-2"
            >
                <b-form-textarea id="input-2" v-model="description" rows="3" max-rows="6" placeholder="Post description"
                                 required/>
            </b-form-group>
            <b-form-group
                    id="input-group-3"
                    label="Image"
                    label-for="input-3"
                    description="The file must be an image."
            >
                <b-form-file
                        id="input-3"
                        v-model="image"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                        required
                        accept="image/jpeg, image/png, image/gif"
                />
            </b-form-group>
            <b-button type="submit" variant="primary">Save</b-button>
        </b-form>
    </div>
</template>

<script>
    import Axios from 'axios';

    export default {
        name: "NewPost",
        data() {
            return {
                image: null,
                title: "",
                description: ""
            }
        },
        methods: {
            onSubmit(evt) {
                console.log(this.image);
                let fd = new FormData();
                fd.append('image', this.image);
                fd.append('description', this.description);
                fd.append('title', this.title);
                evt.preventDefault();
                Axios.post(process.env.VUE_APP_BASE_URL + /post/, fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + this.$store.getters.getToken
                    }
                })
                    .then(res => {
                        this.title = "";
                        this.description = "";
                        this.image = null;
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