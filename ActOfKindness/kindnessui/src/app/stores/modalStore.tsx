import {JSX} from "react";
import {makeAutoObservable} from "mobx";

interface Modal {
    open: boolean,
    body: JSX.Element | null,
    header: string,
    footer: JSX.Element | null
}

export default class ModalStore{
    modal: Modal = {
        body: null,
        open: false,
        header: "",
        footer: null
    }

    constructor() {
        makeAutoObservable(this)
    }

    openModal = (content: JSX.Element, header: string, footer: JSX.Element)=>{
        this.modal.body = content
        this.modal.open = true
        this.modal.header = header
        this.modal.footer = footer
    }

    closeModal =()=>{
        this.modal.body = null
        this.modal.open = false
        this.modal.header = ""
        this.modal.footer = null
    }
}