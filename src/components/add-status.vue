<template>
    <section>
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
            }
        },
        methods: {
            chirp() {
                let id = '_' + Math.random().toString(36).substr(2, 9)
                let attach
                if (this.attachment) {
                    attach = URL.createObjectURL(this.attachment)
                }
                else {
                    attach = null
                }
                let body = {
                    status: this.statusText,
                    attachment: attach,
                    username: this.currentUser.username,
                    name: this.currentUser.name,
                    id: id,
                    timeStamp: Date.now(),
                    image: this.currentUser.picture
                }
                for (let i = 0; i < this.statusText.length; i++) {
                    if (this.statusText.charAt(i) === '#') {
                        let hashtag = ''
                        while (status.charAt(i) !== ' ' && i < status.length) {
                            hashtag += status.charAt(i)
                            i++;
                        }
                        body.hashtags = []
                        body.hashtags.push(hashtag)
                    }
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