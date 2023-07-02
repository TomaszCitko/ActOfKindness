import {makeAutoObservable, reaction, runInAction} from "mobx";
import {User} from "../models/Users/user";
import {LoginForm} from "../models/Users/loginForm";
import agent from "../api/agent";
import {router} from "../router/Routes";
import {store} from "./store";
import {RegisterForm} from "../models/Users/registerForm";

export default class AccountStore{
    token: string | null = localStorage.getItem('jwt')
    user: User | null = null
    isLoggedIn: boolean = false

    constructor() {
        makeAutoObservable(this)
        // this reaction react only when token is changing no when is initialized
        reaction(()=>this.token,// what we want to react to
                token=>{// take argument(this.token)
            if (token){
                localStorage.setItem('jwt', token)
            } else{
                localStorage.removeItem('jwt')
            }
        })
    }

    login = async (loginForm: LoginForm)=>{
        try {
            const user = await agent.Account.login(loginForm)
            runInAction(()=>{
                this.setUser(user)
                this.setToken(user.token)
                this.isLoggedIn = true
                console.log(user)
            })
            await router.navigate('/events')
            store.modalStore.closeModal()
        }
        catch (e) {
            throw e
        }
    }

    register = async (registerForm: RegisterForm)=>{
        try {
            const user = await agent.Account.register(registerForm)
            runInAction(()=>{
                this.setUser(user)
                this.setToken(user.token)
                this.isLoggedIn = true
                console.log(user)
            })
            await router.navigate('/events')
        }
        catch (e) {
            throw e
        }
    }



    logout = async ()=>{
        console.log("logout")
        this.setToken(null)
        this.user = null
        this.isLoggedIn = false
        await router.navigate('/')
    }

    setToken = (token: string | null)=>{
        this.token = token
    }

    setUser = (user: User | null )=>{
        this.user = user
    }

    getUser = async ()=>{
        try {
            const user = await agent.Account.getCurrentUser()
            runInAction(()=>{
                this.setUser(user)
                this.isLoggedIn = true
            })
        } catch (e){
            console.log(e)
        }
    }


}