import {Photo, updateProfile, userProfile} from "../models/Profiles/Profile";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {store} from "./store";
import {MyEvent} from "../models/Events/myEvent";

export default class ProfileStore {
    userEventRegistry =  new Map<string, MyEvent>();
    profile: userProfile | null = null;
    loadingProfile= false;
    uploading= false;
    loading= false;
    success= true;
    numberOfPhotos = 0;


    constructor() {
        makeAutoObservable(this)
    }

    loadUserEvents = async (username:string)=>{
        this.userEventRegistry.clear()
        try {
            const allEventsResponse = await agent.Events.getAllUserEvents(username)
            allEventsResponse.forEach((event) => {
                this.saveEvent(event);
            });
        }
        catch (error) {
            console.log(error)
        }
    }
    saveEvent = async (newEvent: MyEvent)=>{
        this.userEventRegistry.set(newEvent.id,newEvent)
    }
    get myEvents(){
        return Array.from(this.userEventRegistry.values())
    }

    loadProfile = async(username: string)=>{
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.getProfile(username);
            runInAction(()=>{
                this.profile = profile
                this.loadingProfile = false
            })
        }
        catch (e) {
            console.log(e)
            runInAction(()=>{
                this.loadingProfile = false
            })
        }
    }
    
    updateProfile = async(profileToUpdate:updateProfile)=>{
        this.loadingProfile = true;
        try {
            if (this.profile)  {
                const updateresult = await agent.Profiles.updateProfile(this.profile.username,profileToUpdate)
                runInAction(()=>{
                    this.profile = updateresult
                    this.loadingProfile = false

                })
            }
        }
        catch (e) {
            console.log(e)
            runInAction(()=>{
                this.loadingProfile = false
            })
        }
    }

    uploadPhoto = async(file:Blob)=>{
        this.uploading = true
        try {
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data
            runInAction(()=>{
                if (this.profile){
                    this.profile.photos?.push(photo)
                    if (store.accountStore.user){
                        store.accountStore.setMainImage(photo.url)
                        this.profile.mainPhotoUrl = photo.url
                    }
                }
                this.uploading = false
                this.success = false
            })
        }
        catch (e) {
            console.log(e)
            runInAction(()=>{
                this.uploading = false
            })
        }
    }

    setMainPhoto = async(photo: Photo)=>{
        this.loading = true
        try {
            await agent.Profiles.setMainPhoto(photo.id)
            store.accountStore.setMainImage(photo.url)
            runInAction(()=>{
                if (this.profile && this.profile.photos){
                    this.profile.photos.find(p=>p.isMain)!.isMain = false
                    this.profile.photos.find(p=>p.id == photo.id)!.isMain = true
                    this.profile.mainPhotoUrl = photo.url
                    this.loading = false
                }
            })
        }
        catch (e) {
            console.log(e)
            runInAction(()=>{
                this.loading = false
            })
        }
    }
}