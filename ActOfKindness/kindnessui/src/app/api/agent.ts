import axios, {AxiosResponse} from 'axios'

axios.defaults.baseURL = "https://random-data-api.com/api/v2"

// getting our body response
const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string) =>axios.get(url).then(responseBody),
    post: (url: string, body: {}) =>axios.post(url, body).then(responseBody),
    put: (url: string, body:{}) =>axios.put(url,body).then(responseBody),
    del: (url: string) =>axios.delete(url).then(responseBody),
}

// creating object to store our requests

const Events = {
    randomUser: ()=> requests.get('/users')
}

const agent = {
    Events
}

export default agent