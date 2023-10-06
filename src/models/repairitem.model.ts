import { alias, object, primitive, serializable } from "serializr";

class Item {

    @serializable(alias('deleted', primitive()))
    deleted? : boolean

    @serializable(alias('created_at', primitive()))
    createdAt?: string

    @serializable(alias('updated_at', primitive()))
    updatedAt?: string

    @serializable(alias('id', primitive()))
    id?: string

    @serializable(alias('repair', primitive()))
    repair?: string

    @serializable(alias('quantity', primitive()))
    quantity?: string 
}

export class ItemData {
    @serializable(alias('item', object(Item)))
    item?: Item;
}
