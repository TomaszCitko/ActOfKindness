import axios, {AxiosResponse} from 'axios'
import {MyEvent} from "../models/Events/myEvent";
import {MyEventCreate} from "../models/Events/myEventCreate";
import {LoginForm} from "../models/Users/loginForm";
import {User} from "../models/Users/user";
import {RegisterForm} from "../models/Users/registerForm";
import {store} from "../stores/store";
import {Participants} from "../models/Users/participants";
import { MyEventFilter } from '../models/Events/myEventFilter';
import {Photo, updateProfile, userProfile} from "../models/Profiles/Profile";
import { PaginatedEvents } from '../models/Events/paginatedEvents';

const sleep = (delay:number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
}



axios.defaults.baseURL = "http://localhost:5092/api"

const responseBody = <T>(response: AxiosResponse<T>) => response.data


// if we have our token we gonna get user like in postman
axios.interceptors.request.use(config=>{
    const token = store.accountStore.token
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config
})

const requests = {
    get: <T>(url: string) =>axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) =>axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body:{}) =>axios.put<T>(url,body).then(responseBody),
    del: (url: string) =>axios.delete(url).then(responseBody),
    patch: (url: string) => axios.patch(url).then(responseBody),
}

const Events = {
    list: (pageNumber:number)=> requests.get<PaginatedEvents>(`/event?pageNumber=${pageNumber}`),
    getAllUserEvents: (username:string)=> requests.get<MyEvent[]>(`/event/getUserEvents/${username}`),
    create: (event: MyEventCreate)=> requests.post<MyEvent>('/event',event),
    update: (event: MyEventCreate) => requests.put<MyEvent>(`/event/${event.id}`, event),
    details: (id:string)=> requests.get<MyEvent>(`/event/${id}`),
    delete: (id: string) => requests.del(`/event/${id}`),
    userName: (id:string, userId:string)=> requests.get<User>(`/event/${id}`),
    unmoderatedList: ()=> requests.get<MyEvent[]>('/event/unmoderated'),
    moderate: (id: string) => requests.patch(`/event/${id}/moderate`),
    joinEvent: (eventId: string)=> requests.post(`/event/${eventId}/join`, {}),
    getParticipants: (id:string)=> requests.get<Participants[]>(`/event/${id}/participants`),
    filteredList: (eventFilter:MyEventFilter, pageNumber:number)=> axios.get<PaginatedEvents>('/Event/filter', 
    {params: {localization: eventFilter.localization,
        title: eventFilter.title,
        description: eventFilter.description,
        startingDate: eventFilter.startingDate,
        endingDate: eventFilter.endingDate,
        type: eventFilter.type,
        pageNumber: pageNumber}}).then(responseBody),
    leaveEvent: (eventId: string)=> requests.post(`/event/${eventId}/leave`, {})
}

const Account = {
    login: (user: LoginForm)=> requests.post<User>('/account/login', user),
    register: (user: RegisterForm)=> requests.post<User>('/account/register', user),
    getCurrentUser: ()=> requests.get<User>('/account'),
}

const Profiles = {
    getProfile: (username: string)=>requests.get<userProfile>(`/profile/${username}`),
    uploadPhoto: (file: Blob)=> {
        let formData = new FormData()
        formData.append('File',file)
        return axios.post<Photo>('photo/user',formData,{
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    updateProfile: (username:string,profileToUpdate: updateProfile)=> requests.put<userProfile>(`profile/${username}`,profileToUpdate),
    setMainPhoto: (id:string)=> requests.post(`/photo/${id}/setMain`,{}),
    deletePhoto: (id:string)=> requests.del(`/photo/${id}`),
    createFormUpload:(file:Blob)=>{
        let formData = new FormData()
        formData.append('File',file)
        return axios.post<Photo>('photo/uploadPhoto',formData,{
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }
}

const agent = {
    Events,
    Account,
    Profiles,
    sleep,
}

export default agent