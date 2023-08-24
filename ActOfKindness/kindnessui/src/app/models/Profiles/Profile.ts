import {MyEvent} from "../Events/myEvent";

export interface userProfile{
    id: string,
    username: string,
    mainPhotoUrl: string,
    role?: string,
    photos?: Photo[],
    events?: MyEvent[],
    location?: string,
    bio?:string,
    nickname?:string
}

export interface updateProfile {
    location?: string,
    bio?:string,
    nickname?:string
}


export interface Photo {
    id: string,
    url: string,
    isMain: boolean,
}