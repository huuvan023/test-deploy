import axios from 'axios'
import { func } from 'prop-types'
import { API_URL } from './../key'
 
// const token = localStorage.getItem("FBIDToken");
// const a = axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// console.log(a)
// if (token) {
//     axios.defaults.headers.common['Authoriation'] = token
// }

const client = axios.create({
    baseURL: API_URL,
})

async function get(url) {
    try {
        const response = await client.get(url)
        if (response.status === 200) {
            return response.data
        }
    }
    catch (error) {
        throw error
    }
}

async function post(url, data, option) {
    try {
        const response = await client.post(url, data, option) 

        if (response.status === 200) {
            return response.data
        }
    }
    catch (error) {
        throw error
    }
}
export const httpClient = {
    get,
    post
}