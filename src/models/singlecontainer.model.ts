import { serializable, alias, primitive, object } from 'serializr';

export class CustomerData {
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

export class SingleContainerData {

    @serializable(alias('uid', primitive()))
    uid?: string;

    @serializable(alias('yard', primitive()))
    yard?: string;

    @serializable(alias('customer', object(CustomerData)))
    customer?: CustomerData;

    @serializable(alias('owner', primitive()))
    owner?: string;

    @serializable(alias('submitter', primitive()))
    submitter?: string;

    @serializable(alias('length', primitive()))
    length?: number;

    @serializable(alias('height', primitive()))
    height?: number;

    @serializable(alias('type', primitive()))
    type?: string;

    @serializable(alias('year', primitive()))
    year?: number;

    @serializable(alias('location', primitive()))
    location?: string;

    @serializable(alias('door_photo', primitive()))
    doorPhoto?: string;

    @serializable(alias('left_side_photo', primitive()))
    leftSidePhoto?: any;

    @serializable(alias('right_side_photo', primitive()))
    rightSidePhoto?: any;

    @serializable(alias('front_side_photo', primitive()))
    frontSidePhoto?: any;

    @serializable(alias('interior_photo', primitive()))
    interiorPhoto?: any;

    @serializable(alias('under_side_photo', primitive()))
    underSidePhoto?: any;

    @serializable(alias('roof_photo', primitive()))
    roofPhoto?: any;

    @serializable(alias('plate_photo', primitive()))
    platePhoto?: any;

    @serializable(alias('deleted', primitive()))
    deleted?: boolean;

    @serializable(alias('created_at', primitive()))
    createdAt?: string;

    @serializable(alias('updated_at', primitive()))
    updatedAt?: string;

    @serializable(alias('id', primitive()))
    id?: string;
}
