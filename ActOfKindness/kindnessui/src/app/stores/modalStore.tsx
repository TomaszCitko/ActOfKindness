import {JSX} from "react";
import {makeAutoObservable} from "mobx";

interface Modal {
    open: boolean,
    body: JSX.Element | null,
    header: string
}

export default class ModalStore{
    modal: Modal = {
        body: null,
        open: false,
        header: "",
    }

    constructor() {
        makeAutoObservable(this)
    }

    openModal = (content: JSX.Element, header: string)=>{
        this.modal.body = content
        this.modal.open = true
        this.modal.header = header
    }

    closeModal =()=>{
        this.modal.body = null
        this.modal.open = false
        this.modal.header = ""
    }
}