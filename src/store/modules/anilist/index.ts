import axios from 'axios'
import {AnlistMediaItem} from "@/types/Media"
import {StateAnilist as State} from "./types/StateAnilist"

export default {
    namespaced: true,

    state: {
        last_request: new Date()
    } as State,

    mutations: {
        SET_LAST_REQUEST(state: State, payload: Date): void {
            state.last_request = payload
        }
    },

    actions: {
        async searchItem(_: any, search: string): Promise<any>  {
            let result;

            try {
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
                    format
                  }
                }
                `

                const res = await axios({
                    method: 'post',
                    url: 'https://graphql.anilist.co',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    data: {
                        query: query,
                        variables: {
                            search: search
                        }
                    }
                })

                result = res.data.data.Media as AnlistMediaItem
            } catch (e) {
                console.log('Failed on search:', search, e)
                return {}
            }

            return result
        }
    }
}
