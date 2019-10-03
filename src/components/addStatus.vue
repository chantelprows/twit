<template>
    <section v-if="currentUser.username === selectedUser.username">
        <div style="display: flex;">
            <v-text-field
                    label="Write a chirp. . ."
                    solo
                    v-model="statusText"
                    prepend-inner-icon="mdi-pencil"
                    clearable
                    counter
                    maxlength="200"
            >
            </v-text-field>
            <v-icon @click="showInput = !showInput" large style="padding-bottom: 20px;"> mdi-paperclip </v-icon>
        </div>

        <v-file-input
                v-show="showInput"
                label="Add Photo or Video"
                prepend-icon="mdi-paperclip"
                accept="image/jpeg"
                :rules="rules"
                v-model="attachment"
        >
            <template v-slot:selection="{ text }">
                <v-chip
                        small
                        label
                        color="primary"
                >
                    {{ text }}
                </v-chip>
            </template>
        </v-file-input>
        <v-btn style="color: white;" color="#2196F3" @click="chirp()" :disabled="statusText === ''"> Chirp </v-btn>
    </section>
</template>

<script>
    export default {
        name: "addStatus",
        data: function() {
            return {
                statusText: "",
                attachment: null,
                rules: [
                    //     value => !value || value.size < 2000000 || 'Photo size should be less than 2 MB!',
                ],
                showInput: false
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.currentUser
            },
            selectedUser() {
                return this.$store.state.selectedUser
            }
        },
        methods: {
            chirp() {
                let id = '_' + Math.random().toString(36).substr(2, 9)
                let body = {
                    status: this.statusText,
                    attatchment: this.attatchment,
                    username: this.currentUser.username,
                    name: this.currentUser.name,
                    id: id,
                    timeStamp: Date.now(),
                    image: this.currentUser.picture
                }
                this.$store.dispatch('addStatus', body)
                this.statusText = ""
                this.showInput = false
                this.attachment = null
            }
        }
    }
</script>

<style scoped>

</style>