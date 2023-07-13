import {makeAutoObservable} from "mobx";
import {User} from "../models/Users/user";
import {MyEvent} from "../models/Events/myEvent";
import agent from "../api/agent";
import {MyEventCreate} from "../models/Events/myEventCreate";
import {v4 as uuid} from 'uuid'
import {router} from "../router/Routes";
import {Participants} from "../models/Users/participants";
import { MyEventFilter } from "../models/Events/myEventFilter";

export default class EventStore {
    eventRegistry =  new Map<string, MyEvent>();
    userRegistry = new Map<string, User>();
    selectedEvent : MyEvent | undefined = undefined
    participantsList: Participants[] =[]

    constructor() {
        makeAutoObservable(this)
    }

    getParticipants = async (eventId: string)=>{
        try {
            this.participantsList = []
            const participants = await agent.Events.getParticipants(eventId)
                participants.forEach(participant=>{
                    this.participantsList.push(participant)
                    })
                }
        catch (e) {
            console.log(e)
        }
    }

    get myEvents(){
        return Array.from(this.eventRegistry.values())
    }

    createEvent = async(newEvent: MyEventCreate)=>{
        newEvent.id = uuid();
        try {
            await agent.Events.create(newEvent)
            await router.navigate('/events')
        }
        catch (e) {
            console.log(e)
        }
    }

    updateEvent = async(updatedEvent: MyEventCreate)=>{
        try {
            await agent.Events.update(updatedEvent)
            await router.navigate('/events')
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
        this.selectedEvent = undefined
        // let tempDetails = this.getEvent(id)
            try{
                const eventDetails = await agent.Events.details(id)
                this.selectedEvent = eventDetails
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

    joinEvent = async(eventId : string)=>{
        try {
            await agent.Events.joinEvent(eventId)
            await this.getParticipants(eventId)
        }
        catch (e) {
            console.log(e)
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

    loadFilteredEvents = async (filteredList:MyEventFilter)=>{
        try {
            const filteredEventsResponse = await agent.Events.filteredList(JSON.parse(JSON.stringify(filteredList)));
            this.clearEvents();      
            filteredEventsResponse.forEach((event: MyEvent)=>{
                this.saveEvent(event)
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}