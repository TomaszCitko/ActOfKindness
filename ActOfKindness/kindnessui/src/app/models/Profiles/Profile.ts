import {MyEvent} from "../Events/myEvent";

export interface userProfile{
    id: string,
    username: string,
    mainPhotoUrl: string,
    role?: string,
    photos?: Photo[],
    events?: MyEvent[],
}

export interface Photo {
    id: string,
    url: string,
    isMain: boolean,
}