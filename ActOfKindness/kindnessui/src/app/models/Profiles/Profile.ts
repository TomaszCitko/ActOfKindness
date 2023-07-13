export interface userProfile{
    id: string,
    username: string,
    mainPhotoUrl: string,
    role?: string,
    photos?: Photo[],

}

export interface Photo {
    id: string,
    url: string,
    isMain: boolean,

}