import EventStore from "./eventStore";
import {createContext, useContext} from "react";

interface Store {
    eventStore: EventStore
}

export const store: Store = {
    eventStore: new EventStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext);
}