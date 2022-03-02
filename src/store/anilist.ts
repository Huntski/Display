import axios from 'axios'

export default {
    namespaced: true,

    getters: {},

    actions: {
        getThumbnail() {
            try {
                const query = `
                query ($search: String) {
                  Media (search: $search, type: ANIME) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                  }
                }
                `
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                };

                const variables = {
                    search: "Test"
                }

                axios({
                    method: 'post',
                    url: 'https://graphql.anilist.co',
                    headers: headers,
                    data: {
                        query: query,
                        variables: variables
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    }
}