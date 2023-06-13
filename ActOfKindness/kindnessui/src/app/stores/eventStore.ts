import {makeAutoObservable} from "mobx";
import {User} from "../models/user";
import agent from "../api/agent";

export default class EventStore {
    eventRegistry =  new Map<string, Event>();
    userRegistry = new Map<string, User>();

    constructor() {
        makeAutoObservable(this)
    }

    populateUser=()=>{
        agent.Events.randomUser().then(response => {
            const ourUser = {
                id: response.id,
                first_name:  response.first_name,
                avatar: response.avatar
            }
            this.userRegistry.set(ourUser.id,ourUser)

            this.users.map(user=>(
                console.log(user)
            ))
        })
    }

    get users(){
        return Array.from(this.userRegistry.values())
    }
}