export interface CreatedBy {
    username: string
    nickname: string
}

export interface MyEvent {
    id: string
    userId: string
    createdBy: CreatedBy
    createdTime: string
    localization: string
    title:	string
    description: string
    startingDate: string
    endingDate: string
    done: string
    latitude: string
    longitude: string
    moderated: string
    type: string
    image: string
}