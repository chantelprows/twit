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

        <div v-show="showInput" style="display: flex;">
            <v-select
                    :items="['Photo', 'Video']"
                    label="Type"
                    v-model="type"
                    solo
                    style="width: 3px; margin-right: 20px;"
            >
            </v-select>
            <v-text-field
                    label="URL"
                    prepend-inner-icon="mdi-paperclip"
                    v-model="attachment"
                    clearable
                    solo
            >
            </v-text-field>
        </div>
        <v-btn style="color: white;" color="#2196F3" @click="chirp()" :disabled="statusText === ''"> Chirp </v-btn>
    </section>
</template>

<script>
    export default {
        name: "addStatus",
        data: function() {
            return {
                statusText: "",
                attachment: "",
                rules: [
                    //     value => !value || value.size < 2000000 || 'Photo size should be less than 2 MB!',
                ],
                showInput: false,
                type: ""
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
                let body = {
                    status: this.statusText,
                    username: this.currentUser.username,
                    name: this.currentUser.name,
                    id: id,
                    timeStamp: Date.now(),
                    image: this.currentUser.photo
                }
                if (this.attachment) {
                    body.attachment = this.attachment
                    body.type = this.type
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
                this.attachment = ""
                this.type = ""
            }
        }
    }
</script>

<style scoped>

</style>