import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {makeAutoObservable, runInAction} from "mobx";
import {ChatComment} from "../models/Comments/comment";
import {store} from "./store";
import {HubConnection} from "@microsoft/signalr";

export default class CommentStore {
    comments:ChatComment [] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    createHubConnection = (eventId:string)=>{
        if (eventId){
            this.hubConnection =  new HubConnectionBuilder()
                .withUrl('http://localhost:5092/chat?eventId='+ eventId,{
                    accessTokenFactory: ()=> store.accountStore.token!
                    })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build()
            this.hubConnection
                .start().catch(e=>console.log("error establishing connetction",e))
            this.hubConnection
                .on('GetAllComments',(allComments:ChatComment[])=>{
                runInAction(()=>{
                    allComments.forEach(c=>{
                        c.createdAt = new Date(c.createdAt + 'Z')
                    })
                    this.comments = allComments
                } )
            })
            this.hubConnection
                .on('ReceiveCommentAfterCreatingOne',(newComment:ChatComment)=>{
                runInAction(
                    ()=> {
                        newComment.createdAt = new Date(newComment.createdAt)
                        this.comments.push(newComment)})
            })
        }

        }

    disconect = ()=>{
        this.hubConnection?.stop().catch(error=> console.log('error while stoping connection',error))
    }

    clearComments=()=>{
        this.comments = []
        this.disconect()
    }

    addComment= async (values:any)=>{
        console.log(values)
        values.eventId = store.eventStore.selectedEvent?.id
        try {
            await this.hubConnection?.invoke('SendComment',values.eventId,values.message)
        }
        catch (e){
            console.log(e)
        }
    }
}