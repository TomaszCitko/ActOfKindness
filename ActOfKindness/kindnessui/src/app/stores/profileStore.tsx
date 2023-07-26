import {Photo, userProfile} from "../models/Profiles/Profile";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {store} from "./store";

export default class ProfileStore {
    profile: userProfile | null = null;
    loadingProfile= false;
    uploading= false;
    loading= false;
    success= true;


    constructor() {
        makeAutoObservable(this)
    }

    loadProfile = async(username: string)=>{
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.getProfile(username);
            runInAction(()=>{
                console.log(profile)
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