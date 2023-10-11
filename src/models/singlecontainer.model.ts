import { alias, object, primitive, serializable } from "serializr";

export class Customer {
    @serializable(alias('name', primitive()))
    name?: string;

    @serializable(alias('email', primitive()))
    email?: string;

    @serializable(alias('owner_name', primitive()))
    ownerName?: string;

    @serializable(alias('biller_name', primitive()))
    billerName?: string;

    @serializable(alias('rate', primitive()))
    rate?: number;

    @serializable(alias('gst', primitive()))
    gst?: number;

    @serializable(alias('pst', primitive()))
    pst?: number;

    @serializable(alias('city', primitive()))
    city?: string;

    @serializable(alias('address', primitive()))
    address?: string;

    @serializable(alias('province', primitive()))
    province?: string;

    @serializable(alias('zip', primitive()))
    zip?: string;

    @serializable(alias('repair_type', primitive()))
    repairType?: string;

    @serializable(alias('active', primitive()))
    active?: boolean;

    @serializable(alias('deleted', primitive()))
    deleted?: boolean;

    @serializable(alias('uid', primitive()))
    uid?: string;

    @serializable(alias('created_at', primitive()))
    createdAt?: string;

    @serializable(alias('updated_at', primitive()))
    updatedAt?: string;

    @serializable(alias('id', primitive()))
    id?: string;
}

export class leftSidePhoto {
    @serializable(alias('key', primitive()))
    key?: string;

    @serializable(alias('media_type', primitive()))
    mediaType?: string;

    @serializable(alias('size', primitive()))
    size?: number;

    @serializable(alias('deleted', primitive()))
    deleted?: boolean;

    @serializable(alias('created_at', primitive()))
    createdAt?: string;

    @serializable(alias('updated_at', primitive()))
    updatedAt?: string;

    @serializable(alias('id', primitive()))
    id?: string;
}

export class rightSidePhoto {
    @serializable(alias('key', primitive()))
    key?: string;

    @serializable(alias('media_type', primitive()))
    mediaType?: string;

    @serializable(alias('size', primitive()))
    size?: number;

    @serializable(alias('deleted', primitive()))
    deleted?: boolean;

    @serializable(alias('created_at', primitive()))
    createdAt?: string;

    @serializable(alias('updated_at', primitive()))
    updatedAt?: string;

    @serializable(alias('id', primitive()))
    id?: string;
}

export class frontSidePhoto {
    @serializable(alias('key', primitive()))
    key?: string;

    @serializable(alias('media_type', primitive()))
    mediaType?: string;

    @serializable(alias('size', primitive()))
    size?: number;

    @serializable(alias('deleted', primitive()))
    deleted?: boolean;

    @serializable(alias('created_at', primitive()))
    createdAt?: string;

    @serializable(alias('updated_at', primitive()))
    updatedAt?: string;

    @serializable(alias('id', primitive()))
    id?: string;
}

export class interiorPhoto {
    @serializable(alias('key', primitive()))
    key?: string;

    @serializable(alias('media_type', primitive()))
    mediaType?: string;

    @serializable(alias('size', primitive()))
    size?: number;

    @serializable(alias('deleted', primitive()))
    deleted?: boolean;

    @serializable(alias('created_at', primitive()))
    createdAt?: string;

    @serializable(alias('updated_at', primitive()))
    updatedAt?: string;

    @serializable(alias('id', primitive()))
    id?: string;
}

export class underSidePhoto {
    @serializable(alias('key', primitive()))
    key?: string;

    @serializable(alias('media_type', primitive()))
    mediaType?: string;

    @serializable(alias('size', primitive()))
    size?: number;

    @serializable(alias('deleted', primitive()))
    deleted?: boolean;

    @serializable(alias('created_at', primitive()))
    createdAt?: string;

    @serializable(alias('updated_at', primitive()))
    updatedAt?: string;

    @serializable(alias('id', primitive()))
    id?: string;
}

export class roofPhoto {
    @serializable(alias('key', primitive()))
    key?: string;

    @serializable(alias('media_type', primitive()))
    mediaType?: string;

    @serializable(alias('size', primitive()))
    size?: number;

    @serializable(alias('deleted', primitive()))
    deleted?: boolean;

    @serializable(alias('created_at', primitive()))
    createdAt?: string;

    @serializable(alias('updated_at', primitive()))
    updatedAt?: string;

    @serializable(alias('id', primitive()))
    id?: string;
}

export class platePhoto {
    @serializable(alias('key', primitive()))
    key?: string;

    @serializable(alias('media_type', primitive()))
    mediaType?: string;

    @serializable(alias('size', primitive()))
    size?: number;

    @serializable(alias('deleted', primitive()))
    deleted?: boolean;

    @serializable(alias('created_at', primitive()))
    createdAt?: string;

    @serializable(alias('updated_at', primitive()))
    updatedAt?: string;

    @serializable(alias('id', primitive()))
    id?: string;
}

export class Container {
    @serializable(alias('uid', primitive()))
    uid?: string

    @serializable(alias('yard', primitive()))
    yard?: string

    @serializable(alias('customer', object(Customer)))
    customer? : Customer

    @serializable(alias('owner', primitive()))
    owner?: string

    @serializable(alias('submitter', primitive()))
    submitter?: string

    @serializable(alias('height', primitive()))
    length?: string

    @serializable(alias('type', primitive()))
    type?: string

    @serializable(alias('height', primitive()))
    height?: string

    @serializable(alias('year', primitive()))
    year?: string

    @serializable(alias('location', primitive()))
    location?: string

    @serializable(alias('door_photo', primitive()))
    doorPhoto?: string

    @serializable(alias('left_side_photo', object(leftSidePhoto)))
    leftSidePhoto?: leftSidePhoto[]

    @serializable(alias('right_side_photo', object(rightSidePhoto)))
    rightSidePhoto?: rightSidePhoto[]

    @serializable(alias('front_side_photo', object(frontSidePhoto)))
    frontSidePhoto?: frontSidePhoto[]

    @serializable(alias('interior_photo', object(interiorPhoto)))
    interiorPhoto?: interiorPhoto[]

    @serializable(alias('under_side_photo', object(underSidePhoto)))
    underSidePhoto?: underSidePhoto[]

    @serializable(alias('roof_photo', object(roofPhoto)))
    roofPhoto?: roofPhoto[]

    @serializable(alias('plate_photo', object(platePhoto)))
    platePhoto?: platePhoto

    @serializable(alias('deleted', primitive()))
    deleted? : boolean

    @serializable(alias('created_at', primitive()))
    createdAt?: string

    @serializable(alias('updated_at', primitive()))
    updatedAt?: string

    @serializable(alias('id', primitive()))
    id?: string
}


export class ContainerData {
    @serializable(alias('container', object(Container)))
    container?: Container;
}


export const InitialContainerFormValues = {
    ...Container,
    ...ContainerData,
    ...Customer,
}