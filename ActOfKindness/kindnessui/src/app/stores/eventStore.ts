import {makeAutoObservable} from "mobx";

export default class EventStore {
    eventRegistry =  new Map<string, Event>();


    constructor() {
        makeAutoObservable(this)
    }

    populateEvents=(id: string,newEvent: Event)=>{
        this.eventRegistry.set("1",newEvent)
    }
}