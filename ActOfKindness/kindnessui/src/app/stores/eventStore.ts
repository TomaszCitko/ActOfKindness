import {makeAutoObservable, runInAction} from "mobx";
import {User} from "../models/Users/user";
import {MyEvent} from "../models/Events/myEvent";
import agent from "../api/agent";
import {MyEventCreate} from "../models/Events/myEventCreate";
import {v4 as uuid} from 'uuid'
import {redirect} from "react-router-dom";

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

    createEvent = async(newEvent: MyEventCreate)=>{
        newEvent.id = uuid()
        try {
            await agent.Events.create(newEvent)
            runInAction(()=>{
                console.log()
                redirect('/')
            })
        }
        catch (e) {
            console.log(e)
        }
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

    deleteFromRegistry = (id: string) => {
        this.eventRegistry.delete(id);
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

    deleteEvent = async (id: string) => {
        try {
            await agent.Events.delete(id);
            this.deleteFromRegistry(id);
        } catch (error) {
            console.log(error);
        }
    }

    getUser = async(id:string, userId:string)=>
    {
        try{
            const userData = await agent.Events.userName(id, userId)
            console.log('user details', userData)
            return userData
        }
        catch (error){
            console.log(error)
        }
    }

    loadUnmoderatedEvents = async ()=>{
        try {
            const unmoderatedEventsResponse = await agent.Events.unmoderatedList()
            unmoderatedEventsResponse.forEach(event=>{
                this.saveEvent(event)
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    moderateEvent = async (id: string) => {
        try {
            await agent.Events.moderate(id);
            this.deleteFromRegistry(id);
        } catch (error) {
            console.log(error);
        }
    }

    clearEvents = () => {
        this.eventRegistry.clear();
    }

}