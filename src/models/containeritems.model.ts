import { alias, primitive, serializable } from "serializr";

export class ItemData {
    @serializable(alias('active', primitive()))
    active?: boolean;

    @serializable(alias('container', primitive()))
    container?: string
    
    @serializable(alias('created_at', primitive()))
    createdAt?: string

    @serializable(alias('curr_status', primitive()))
    currentStatus?: string

    @serializable(alias('deleted', primitive()))
    deleted?: boolean

    @serializable(alias('id', primitive()))
    id?: string

}

