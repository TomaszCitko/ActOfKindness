import { makeAutoObservable, runInAction } from "mobx";
import {User} from "../models/Users/user";
import {MyEvent} from "../models/Events/myEvent";
import agent from "../api/agent";
import {MyEventCreate} from "../models/Events/myEventCreate";
import {v4 as uuid} from 'uuid'
import {router} from "../router/Routes";
import {Participants} from "../models/Users/participants";
import { MyEventFilter } from "../models/Events/myEventFilter";
import { toast } from 'react-toastify';

export default class EventStore {
    eventRegistry =  new Map<string, MyEvent>();
    unmoderatedEventRegistry = new Map<string, MyEvent>();
    userRegistry = new Map<string, User>();
    selectedEvent : MyEvent | undefined = undefined;
    participantsList: Participants[] = [];
    uploading= false;
    success= true;
    pageNumber: number = 1;
    totalPages: number = 0;
    loading = true;
    loadingHomePage = true;
    loadingEventDetails = false;
    isFiltered = false;
    filteredList: MyEventFilter = {
        localization: '',
        title: '',
        description: '',
        startingDate: '',
        endingDate: '',
        type: ''
    };

    constructor() {
        makeAutoObservable(this)
    }

    turnOffLoading() {
        this.loading = false;
    }

    get myEvents(){
        return Array.from(this.eventRegistry.values())
    }

    get unmoderatedEvents(){
        return Array.from(this.unmoderatedEventRegistry.values());
    }

    saveEvent = (newEvent: MyEvent)=>{
        this.eventRegistry.set(newEvent.id, newEvent);
    }

    saveUnmoderatedEvent = (event: MyEvent) => {
        this.unmoderatedEventRegistry.set(event.id, event);
    }

    deleteFromRegistry = (id: string) => {
        this.eventRegistry.delete(id);
    }

    deleteUnmoderatedEventFromRegistry = (id: string) => {
        this.unmoderatedEventRegistry.delete(id);
    }

    clearEvents = () => {
        this.eventRegistry.clear();
    }

    clearUnmoderatedEvents = () => {
        this.unmoderatedEventRegistry.clear();
    }

    loadEvents = async (pageNumber: number)=>{
        try {
            const allEventsResponse = await agent.Events.list(pageNumber)
            runInAction(()=>{
                this.pageNumber = allEventsResponse.pageNumber;
                this.totalPages = allEventsResponse.totalPages;
                allEventsResponse.items.forEach(this.saveEvent);
            })
        }
        catch (error) {
            console.log(error);
            toast.error('Failed to load events.');
        }
    }

    loadUnmoderatedEvents = async ()=>{
        try {
            const unmoderatedEventsResponse = await agent.Events.unmoderatedList();
            unmoderatedEventsResponse.forEach(event=>{
                this.saveUnmoderatedEvent(event)
            })
            await agent.sleep(1000);
            this.loadingEventDetails = false
            this.loading = false
        }
        catch (error) {
            console.log(error);
            toast.error('Failed to load events.');
        }
    }


    createEvent = async(newEvent: MyEventCreate)=>{
        newEvent.id = uuid();
        try {
            await agent.Events.create(newEvent);
            toast.success("Event successfully created! It's now awaiting moderation.");
            await router.navigate('/events');
            this.success = false;
        }
        catch (e) {
            console.log(e);
            if ((e as any).response.data !== "") {
                toast.error(`Event creation failed: ${(e as any).response.data}.`);
            } else {
                toast.error('Something went wrong while creating the event.');
            }
        }
    }

    updateEvent = async(updatedEvent: MyEventCreate)=>{
        try {
            await agent.Events.update(updatedEvent);
            toast.success("Event updated successfully! It's now awaiting moderation.");
            await router.navigate('/events');
            this.success = false;
        }
        catch (e) {
            console.log(e);
            if ((e as any).response.data !== "") {
                toast.error(`Event update failed: ${(e as any).response.data}.`);
            } else {
                toast.error('Something went wrong while updating the event.');
            }
        }
    }

    uploadPhotoForCreateEvent = async(file:Blob)=>{
        this.uploading = true
        try {
            const response = await agent.Profiles.createFormUpload(file)
            const url = response.data.url
            runInAction(()=>{
                this.success = true;
                this.uploading = false;
            })
            if (url)
            {
                return url;
            }
        }
        catch (e) {
            console.log(e)
            runInAction(()=>{
                this.uploading = false
            })
        }
    }


    loadEventDetails = async(id:string)=>{
        this.selectedEvent = undefined
            try{
                const eventDetails = await agent.Events.details(id)
                console.log(eventDetails)
                this.selectedEvent = eventDetails
                return eventDetails
            }
            catch (error){
                console.log(error);
                toast.error('Failed to load event details.');
            }
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
            console.log(e);
            toast.error('Failed to fetch participants.');
        }
    }

    
    loadFilteredEvents = async (filteredList:MyEventFilter, pageNumber:number)=>{
        try {
            this.filteredList = filteredList;
            const filteredEventsResponse = await agent.Events.filteredList(JSON.parse(JSON.stringify(filteredList)), pageNumber);
            this.pageNumber = filteredEventsResponse.pageNumber;
            this.totalPages = filteredEventsResponse.totalPages;
            this.clearEvents();      
            filteredEventsResponse.items.forEach((event: MyEvent)=>{
                this.saveEvent(event)
            })
            this.checkEnteredFilters();
        }
        catch (error) {
            console.log(error)
        }
    }
    
    checkEnteredFilters = () => {
        this.isFiltered = Object.values(this.filteredList).some(value => value !== '');
    }
    // checkEnteredFilters = () => {
    //     let counter:number = 0;
    //     Object.entries(this.filteredList).forEach(([key, value]) => {
    //         if (value != ''){
    //             counter++;
    //         }
    //     })
    //     if (counter === 0){
    //         this.isFiltered = false;
    //     }
    //     else{
    //         this.isFiltered = true;
    //     }
    // }


    deleteEvent = async (id: string) => {
        try {
            await agent.Events.delete(id);
            if (this.eventRegistry.has(id)) {
                this.deleteFromRegistry(id);
            } else if (this.unmoderatedEventRegistry.has(id)) {
                this.deleteUnmoderatedEventFromRegistry(id);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    moderateEvent = async (id: string) => {
        try {
            await agent.Events.moderate(id);
            this.deleteUnmoderatedEventFromRegistry(id);
        } catch (error) {
            console.log(error);
        }
    }
    
    joinEvent = async(eventId : string)=>{
        try {
            await agent.Events.joinEvent(eventId);
            await this.getParticipants(eventId);
            toast.info('Successfully joined the event!');
        }
        catch (e) {
            console.log(e);
            if ((e as any).response.data !== "") {
                toast.error(`Failed to join the event: ${(e as any).response.data}.`);
            } else {
                toast.error('Failed to join the event.');
            }
        }
    }
    
    leaveEvent = async(eventId : string)=>{
        try {
            await agent.Events.leaveEvent(eventId);
            await this.getParticipants(eventId);
            toast.warning('Successfully left the event!');
        }
        catch (e) {
            console.log(e);
            toast.error('Failed to leave the event.');
        }
    }

    // private getEvent = async(id:string) =>{
    //     return this.eventRegistry.get(id)
    // }

    // getUser = async(id:string, userId:string)=>
    // {
    //     try{
    //         const userData = await agent.Events.userName(id, userId)
    //         return userData
    //     }
    //     catch (error){
    //         console.log(error)
    //     }
    // }
}