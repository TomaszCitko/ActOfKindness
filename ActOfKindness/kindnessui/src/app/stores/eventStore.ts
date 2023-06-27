import {makeAutoObservable} from "mobx";
import {User} from "../models/Users/user";
import {MyEvent} from "../models/Events/myEvent";
import agent from "../api/agent";

export default class EventStore {
    static loadEventDetails(id: any) {
        throw new Error('Method not implemented.');
    }
    eventRegistry =  new Map<string, MyEvent>();
    userRegistry = new Map<string, User>();
    selectedEvent : MyEvent | undefined = undefined
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

    loadEventDetails = async(id:string)=>{
        let tempDetails = this.getEvent(id)
        // if (tempDetails){
        //     console.log(tempDetails)
        //     return tempDetails
        // }
        // else 
        // {
            try{
                const eventDetails = await agent.Events.details(id)
                console.log('Event details', eventDetails)
                return eventDetails
            }
            catch (error){
                console.log(error)
            }
        // }

        
    }
    private getEvent = async(id:string) =>{
        return this.eventRegistry.get(id)

        
    }

}