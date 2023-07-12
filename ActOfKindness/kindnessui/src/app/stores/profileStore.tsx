import {userProfile} from "../models/Profiles/Profile";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";

export default class ProfileStore {
    profile: userProfile | null = null;
    loadingProfile= false;

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

}