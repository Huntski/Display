import axios from 'axios'
import {AnlistMediaItem} from "@/types/Media"

export default {
    namespaced: true,

    state: {
        last_request: Date
    },

    mutations: {
        SET_LAST_REQUEST(state: any, payload: Date) {
            state.last_request = payload
        }
    },

    actions: {
        async searchItem({dispatch}: {dispatch: any}, search: string): Promise<AnlistMediaItem> {
            const query = ` 
                query ($search: String) {
                  Media (search: $search, type: ANIME) {
                    id
                    coverImage {
                        large
                        color
                    }
                    title {
                        romaji
                        english
                        native
                    }
                    description
                    episodes
                  }
                }
                `

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }

            const data = {
                query: query,
                variables: {
                    search: search
                }
            }

            const res = await axios({
                method: 'post',
                url: 'https://graphql.anilist.co',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                data: data
            })

            console.log('Anilist Response:', res.data.data)

            return res.data.data.Media
        }
    }
}