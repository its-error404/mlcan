import { alias, primitive, serializable } from "serializr";

export class AddContainerValues {
    @serializable(alias('uid', primitive()))
    uid?: string

    @serializable(alias('yard', primitive()))
    yard?: string

    @serializable(alias('uid', primitive()))
    customer?: string
    
    @serializable(alias('owner', primitive()))
    owner?: string

    @serializable(alias('submitter', primitive()))
    submitter?: string

    @serializable(alias('length', primitive()))
    length?: string

    @serializable(alias('height', primitive()))
    height?: string

    @serializable(alias('type', primitive()))
    type?: string

    @serializable(alias('year', primitive()))
    year?: string

    @serializable(alias('location', primitive()))
    location?: string

    @serializable(alias('door_photo', primitive()))
    doorPhoto?: string

    @serializable(alias('left_side_photo', primitive()))
    leftSidePhoto?: string

    @serializable(alias('right_side_photo', primitive()))
    rightSidePhoto?: string

    @serializable(alias('front_side_photo', primitive()))
    frontSidePhoto?: string

    @serializable(alias('interior_photo', primitive()))
    interiorPhoto?: string

    @serializable(alias('roof_photo', primitive()))
    roofPhoto?: string

    @serializable(alias('under_side_photo', primitive()))
    underSidePhoto?: string

    @serializable(alias('plate_photo', primitive()))
    platePhoto?: string
}

export const initialAddContainerFormValues = new AddContainerValues()