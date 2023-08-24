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
    isOnline:boolean
    title:	string
    description: string
    startingDate: string
    endingDate: string
    isFinished: boolean
    latitude: string
    longitude: string
    moderated: string
    type: number
    image: string
    participants: string[]
}