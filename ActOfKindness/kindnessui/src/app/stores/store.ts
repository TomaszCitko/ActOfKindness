import EventStore from "./eventStore";
import {createContext, useContext} from "react";
import AccountStore from "./accountStore";
import ModalStore from "./modalStore";
import CommentStore from "./commentStore";
import ProfileStore from "./profileStore";

interface Store {
    eventStore: EventStore,
    accountStore: AccountStore,
    modalStore: ModalStore,
    commentStore: CommentStore,
    profileStore: ProfileStore,

}

export const store: Store = {
    eventStore: new EventStore(),
    accountStore: new AccountStore(),
    modalStore: new ModalStore(),
    commentStore: new CommentStore(),
    profileStore: new ProfileStore(),

}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}