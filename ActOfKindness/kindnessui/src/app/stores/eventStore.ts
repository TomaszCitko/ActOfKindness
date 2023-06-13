import {makeAutoObservable} from "mobx";
import {User} from "../models/user";
import {MyEvent} from "../models/myEvent";
import agent from "../api/agent";

export default class EventStore {
    eventRegistry =  new Map<string, MyEvent>();
    userRegistry = new Map<string, User>();

    constructor() {
        makeAutoObservable(this)
    }

    get myEvents(){
        return Array.from(this.eventRegistry.values())
    }

    loadEvents = async ()=>{
        try {
            const allEventsResponse = await agent.Events.list()
            allEventsResponse.forEach(event=>{
                this.saveEvent(event)
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    saveEvent = async (newEvent: MyEvent)=>{
        this.eventRegistry.set(newEvent.id,newEvent)
    }
}