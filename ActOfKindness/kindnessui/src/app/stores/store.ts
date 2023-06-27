import EventStore from "./eventStore";
import {createContext, useContext} from "react";
import AccountStore from "./accountStore";
import ModalStore from "./modalStore";

interface Store {
    eventStore: EventStore,
    accountStore: AccountStore,
    modalStore: ModalStore,
}

export const store: Store = {
    eventStore: new EventStore(),
    accountStore: new AccountStore(),
    modalStore: new ModalStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}