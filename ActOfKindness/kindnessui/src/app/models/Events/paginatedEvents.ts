import { MyEvent } from "./myEvent";

export interface PaginatedEvents {
   items: MyEvent[]
   pageNumber: number
   totalItems: number
   totalPages: number
}